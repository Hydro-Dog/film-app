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
const FILMS_PAGE_SIZE = 20

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
    1,
    false,
    false,
    false,
    filmsSequenceJson,
    category,
    filterParams
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

    this.appGetaway.emitToClient(
      guest.id.toString(),
      MatchSessionSocketEvents.ServerMessage,
      {
        payload: matchSession,
        event: MatchSessionChangesEvents.Add,
      }
    )

    this.appGetaway.emitToClient(
      host.id.toString(),
      MatchSessionSocketEvents.ServerMessage,
      {
        payload: matchSession,
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
        payload: matchSessionNew,
        event: MatchSessionChangesEvents.ChangeStatus,
      }
    )

    this.appGetaway.emitToClient(
      matchSessionNew.guest.id.toString(),
      MatchSessionSocketEvents.ServerMessage,
      {
        payload: matchSessionNew,
        event: MatchSessionChangesEvents.ChangeStatus,
      }
    )

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
    filmJSON: string,
    userId: number,
    swipeDirection: 'left' | 'right'
  ) {
    const film = JSON.parse(filmJSON)
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
      currentMatchSession.hostLikedFilms.push(film.id.toString())
      //check for matches isMatched: true?
      isMatched = currentMatchSession.guestLikedFilms.includes(
        film.id.toString()
      )
    } else if (
      userId == +currentMatchSession.guest.id &&
      swipeDirection === 'right'
    ) {
      currentMatchSession.guestLikedFilms.push(film.id.toString())
      isMatched = currentMatchSession.hostLikedFilms.includes(
        film.id.toString()
      )
    }

    if (isMatched) {
      //update matchedFilms array
      currentMatchSession.matchedMoviesJSON.push(filmJSON)
      const filmIndex =
        userId === +currentMatchSession.host.id
          ? currentMatchSession.hostCurrentFilmIndex
          : currentMatchSession.guestCurrentFilmIndex

      //send notifications to both users
      this.appGetaway.emitToClient(
        currentMatchSession.guest.id.toString(),
        MatchSessionSocketEvents.ServerMessage,
        {
          event: MatchSessionChangesEvents.FilmsMatch,
          payload: {
            filmJSON: currentMatchSession.filmsSequenceJson[filmIndex],
            source:
              userId.toString() === currentMatchSession.guest.id.toString()
                ? 'self'
                : 'opponent',
          },
        }
      )

      this.appGetaway.emitToClient(
        currentMatchSession.host.id.toString(),
        MatchSessionSocketEvents.ServerMessage,
        {
          event: MatchSessionChangesEvents.FilmsMatch,
          payload: {
            filmJSON: currentMatchSession.filmsSequenceJson[filmIndex],
            source:
              userId.toString() === currentMatchSession.host.id.toString()
                ? 'self'
                : 'opponent',
          },
        }
      )
    }

    //increment users CurrentFilmIndex
    if (userId === +currentMatchSession.host.id) {
      currentMatchSession.hostCurrentFilmIndex++
    } else {
      currentMatchSession.guestCurrentFilmIndex++
    }

    let completed =
      currentMatchSession.matchedMoviesJSON.length >=
      currentMatchSession.matchLimit

    const lastFilmIndex = currentMatchSession.filmsSequenceJson.length - 1
    if (
      currentMatchSession.hostCurrentFilmIndex >= lastFilmIndex ||
      currentMatchSession.guestCurrentFilmIndex >= lastFilmIndex
    ) {
      const currentPage =
        currentMatchSession.filmsSequenceJson.length / FILMS_PAGE_SIZE
      const filmsSequence = await this.filmService.getFilmsByCategory(
        (currentPage + 1).toString(),
        currentMatchSession.category as FilmCategories
      )

      currentMatchSession.filmsSequenceJson = [
        ...currentMatchSession.filmsSequenceJson,
        ...filmsSequence.map((filmObj) => JSON.stringify(filmObj)),
      ]
    }

    return await this.matchSessionRepository.save(currentMatchSession)
  }
}
