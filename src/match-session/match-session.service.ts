import { InjectRepository } from '@nestjs/typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { FilmService } from 'src/film/film.service'
import { User } from 'src/user/user.entity'

import { CreateMatchSessionDTO } from './match-session.dto'
import { MatchSession } from './match-session.entity'
import { AppGetaway } from 'src/app-getaway/app-getaway'
import {
  MatchSessionChangesEvents,
  MatchSessionSocketEvents,
} from './match-session.model'
import { FilmCategories } from 'src/film/film.models'
import { deprecate } from 'util'

const INITIAL_PAGES = '1'
const FILMS_PAGE_SIZE = 10

function matchSessionFactory(
  hostId,
  hostUserName,
  guestId,
  guestUserName,
  matchLimit,
  category,
  filterParams,
  filmsSequenceJson
) {
  return new MatchSession(
    new User({ id: hostId, userName: hostUserName }),
    new User({ id: guestId, userName: guestUserName }),
    'EN',
    0,
    0,
    [],
    [],
    null,
    null,
    [],
    matchLimit,
    false,
    false,
    false,
    filmsSequenceJson,
    category,
    filterParams,
    false
  )
}

@Injectable()
export class MatchSessionService {
  constructor(
    private appGetaway: AppGetaway,
    @InjectRepository(MatchSession)
    private matchSessionRepository: Repository<MatchSession>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private filmService: FilmService
  ) {}

  async create(data: CreateMatchSessionDTO) {
    const filmsSequenceJson = await this.filmService.getFilmsByCategory(
      INITIAL_PAGES,
      data.category
    )

    const host = await this.userRepository.findOne({
      where: { id: data.userId },
    })
    const guest = await this.userRepository.findOne({
      where: { id: data.guestId },
    })

    const matchSessionObj = matchSessionFactory(
      host.id,
      host.userName,
      guest.id,
      guest.userName,
      data.matchLimit,
      data.category,
      data.filterParams,
      filmsSequenceJson
    )

    //create matchSession
    const matchSession = await this.matchSessionRepository.create(
      matchSessionObj
    )

    await this.matchSessionRepository.save(matchSession)

    guest.sessionsInvite = [...guest.sessionsInvite, matchSession.id]

    await this.userRepository.update({ id: host.id }, { ...host })
    await this.userRepository.update({ id: guest.id }, { ...guest })

    // this.appGetaway.emitToClient(
    //   guest.id.toString(),
    //   MatchSessionSocketEvents.MatchSessionChanges,
    //   { matchSession, event: MatchSessionChangesEvents.Add }
    // )

    this.appGetaway.emitToClient(
      guest.id.toString(),
      MatchSessionSocketEvents.ServerMessage,
      {
        message: matchSession,
        event: MatchSessionChangesEvents.Add,
      }
    )

    this.appGetaway.emitToClient(
      host.id.toString(),
      MatchSessionSocketEvents.ServerMessage,
      {
        message: matchSession,
        event: MatchSessionChangesEvents.Add,
      }
    )

    return matchSession
  }

  async update(id: number, matchSessionNew: MatchSession) {
    const matchSessionCurrent = await this.matchSessionRepository.findOne({
      where: { id },
    })

    await this.matchSessionRepository.update({ id }, { ...matchSessionNew })

    if (matchSessionCurrent.accepted === false && matchSessionNew.accepted) {
      const guest = await this.userRepository.findOne({
        where: { id: matchSessionNew.guest.id },
      })

      await this.userRepository.update(
        { id: guest.id },
        { ...guest, currentMatchSession: matchSessionNew.id }
      )
    }

    const updateMatchSession = await this.matchSessionRepository
      .createQueryBuilder('match_session')
      .select([
        'match_session',
        'guest.id',
        'guest.userName',
        'host.id',
        'host.userName',
      ])
      .leftJoin('match_session.guest', 'guest')
      .leftJoin('match_session.host', 'host')
      .where('match_session.id = :id', { id: matchSessionNew.id })
      .getOne()

    this.appGetaway.emitToClient(
      matchSessionNew.host.id.toString(),
      MatchSessionSocketEvents.ServerMessage,
      {
        message: matchSessionNew,
        event: MatchSessionChangesEvents.ChangeStatus,
      }
    )

    this.appGetaway.emitToClient(
      matchSessionNew.guest.id.toString(),
      MatchSessionSocketEvents.ServerMessage,
      {
        message: matchSessionNew,
        event: MatchSessionChangesEvents.ChangeStatus,
      }
    )

    // this.appGetaway.emitToClient(
    //   matchSessionNew.host.id.toString(),
    //   MatchSessionSocketEvents.MatchSessionChanges,
    //   {
    //     matchSession: matchSessionNew,
    //     event: MatchSessionChangesEvents.ChangeStatus,
    //   }
    // )

    // this.appGetaway.emitToClient(
    //   matchSessionNew.guest.id.toString(),
    //   MatchSessionSocketEvents.MatchSessionChanges,
    //   {
    //     matchSession: matchSessionNew,
    //     event: MatchSessionChangesEvents.ChangeStatus,
    //   }
    // )

    return updateMatchSession
  }

  async delete(id: number) {
    await this.matchSessionRepository.delete({ id })

    return id
  }

  async getMatchSessionByUserId(id: any) {
    return await this.matchSessionRepository
      .createQueryBuilder('match_session')
      .select([
        'match_session',
        'guest.id',
        'guest.userName',
        'host.id',
        'host.userName',
      ])
      .leftJoin('match_session.guest', 'guest')
      .leftJoin('match_session.host', 'host')
      .where('match_session.guest.id = :id', { id })
      .orWhere('match_session.host.id = :id', { id })
      .getMany()
  }

  async getMatchSessionById(matchSessionId: any) {
    return await this.matchSessionRepository
      .createQueryBuilder('match_session')
      .select([
        'match_session',
        'guest.id',
        'guest.userName',
        'host.id',
        'host.userName',
      ])
      .leftJoin('match_session.guest', 'guest')
      .leftJoin('match_session.host', 'host')
      .where('match_session.id = :id', { id: matchSessionId })
      .getOne()
  }

  async swipe(
    matchSessionId: number,
    filmId: number,
    userId: number,
    swipeDirection: 'left' | 'right'
  ) {
    //выстреливает только на одобрение фильма, при свайпе влево - ничего не отправляем на бэк

    const currentMatchSession = await this.matchSessionRepository
      .createQueryBuilder('match_session')
      .select([
        'match_session',
        'guest.id',
        'guest.userName',
        'host.id',
        'host.userName',
      ])
      .leftJoin('match_session.guest', 'guest')
      .leftJoin('match_session.host', 'host')
      .where('match_session.id = :id', { id: matchSessionId })
      .getOne()

    let isMatched = false
    if (userId === +currentMatchSession.host.id && swipeDirection === 'right') {
      //if film was liked by user, push new id to liked films array
      currentMatchSession.hostLikedFilms.push(filmId.toString())
      //check for matches isMatched: true?
      isMatched = currentMatchSession.guestLikedFilms.includes(
        filmId.toString()
      )
      currentMatchSession.filmsMatchTookPlace = isMatched
    } else if (
      userId == +currentMatchSession.guest.id &&
      swipeDirection === 'right'
    ) {
      currentMatchSession.guestLikedFilms.push(filmId.toString())
      isMatched = currentMatchSession.hostLikedFilms.includes(filmId.toString())
    }
    currentMatchSession.filmsMatchTookPlace = isMatched

    //update matchedFilms array
    if (isMatched) {
      currentMatchSession.matchedMoviesIds.push(filmId.toString())
      const filmIndex =
        userId === +currentMatchSession.host.id
          ? currentMatchSession.hostCurrentFilmIndex
          : currentMatchSession.guestCurrentFilmIndex

      this.appGetaway.emitToClient(
        userId.toString(),
        MatchSessionSocketEvents.LikesMatched,
        { film: currentMatchSession.filmsSequenceJson[filmIndex] }
      )
    }

    //increment users CurrentFilmIndex
    if (userId === +currentMatchSession.host.id) {
      currentMatchSession.hostCurrentFilmIndex++
    } else {
      currentMatchSession.guestCurrentFilmIndex++
    }

    let completed =
      currentMatchSession.matchedMoviesIds.length >=
      currentMatchSession.matchLimit

    return await this.matchSessionRepository.save(currentMatchSession)
  }

  // deprecated
  // async updateMatchSessionLikes(matchSession: MatchSession, user: User) {
  //   const currentMatchSession = await this.matchSessionRepository.findOne({
  //     where: { id: matchSession.id },
  //   })

  //   //TODO:
  //   //добавить поля hostLikedFILM, guestLikedFILM, wasMatched
  //   //привести к консистентности интерфейсы на фронте и таблицы в базе

  //   //lock row/table by id (type orm)

  //   if (user.id === matchSession.host.id) {
  //     // ЕСЛИ есть значение в guestCurrentlyLikedFilm
  //     // И ЕСЛИ этого фильма нет в массиве matchedFilms
  //     // И ЕСЛИ этот фильм есть в массиве hostLikedFilms
  //     if (
  //       matchSession.guestLikedFilmIndex &&
  //       !currentMatchSession.matchedMoviesIds.includes(
  //         matchSession.guestLikedFilmIndex
  //       ) &&
  //       !currentMatchSession.hostLikedFilms.includes(
  //         matchSession.guestLikedFilmIndex
  //       )
  //     ) {
  //       currentMatchSession.filmsMatchTookPlace = true
  //       // currentMatchSession.matchedMoviesIds.push()
  //     } else {
  //       currentMatchSession.filmsMatchTookPlace = false
  //     }

  //     // if(счетчик юзера === последнему индексу массива фильмов) {
  //     // докачать фильмы из АПИ
  //     // }

  //     if (
  //       matchSession.hostCurrentFilmIndex ===
  //       matchSession.filmsSequenceJson.length
  //     ) {
  //       const page =
  //         (matchSession.filmsSequenceJson.length + 1) / FILMS_PAGE_SIZE
  //       this.filmService.getFilmsByCategory(
  //         page.toString(),
  //         matchSession.category as FilmCategories
  //       )
  //     }

  //     return await this.matchSessionRepository.save({
  //       ...currentMatchSession,
  //       hostLikedFilms: matchSession.hostLikedFilms,
  //       hostCurrentFilmIndex: matchSession.hostCurrentFilmIndex,
  //     })
  //   } else if (user.id === matchSession.guest.id) {
  //     if (
  //       matchSession.hostLikedFilmIndex &&
  //       !currentMatchSession.matchedMoviesIds.includes(
  //         matchSession.hostLikedFilmIndex
  //       ) &&
  //       !currentMatchSession.guestLikedFilms.includes(
  //         matchSession.hostLikedFilmIndex
  //       )
  //     ) {
  //       currentMatchSession.filmsMatchTookPlace = true
  //     } else {
  //       currentMatchSession.filmsMatchTookPlace = false
  //     }

  //     if (
  //       matchSession.guestCurrentFilmIndex ===
  //       matchSession.filmsSequenceJson.length
  //     ) {
  //       const page =
  //         (matchSession.filmsSequenceJson.length + 1) / FILMS_PAGE_SIZE
  //       this.filmService.getFilmsByCategory(
  //         page.toString(),
  //         matchSession.category as FilmCategories
  //       )
  //     }

  //     return await this.matchSessionRepository.save({
  //       ...currentMatchSession,
  //       hostLikedFilms: matchSession.guestLikedFilms,
  //       guestSequenceCounter: matchSession.guestCurrentFilmIndex,
  //     })
  //   } else {
  //     throw new HttpException('Jopa', HttpStatus.BAD_REQUEST)
  //   }
  // }
}
