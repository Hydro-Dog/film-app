import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { FilmService } from 'src/film/film.service'
import { User } from 'src/user/user.entity'

import { Repository } from 'typeorm'
import {
  CreateMatchSessionDTO,
  UpdateMatchSessionDTO,
} from './match-session.dto'
import { MatchSession } from './match-session.entity'
import { AppGetaway } from 'src/app-getaway/app-getaway'
import { MatchSessionSocketEvents } from './match-session.model'
import { AnyMxRecord } from 'dns'

const INITIAL_PAGES = '1,2'

function matchSessionFactory({
  host,
  guest,
  region,
  lang,
  hostSequenceCounter,
  guestSequenceCounter,
  hostLikedFilms,
  guestLikedFilms,
  matchedFilms,
  matchLimit,
  filmsIdsSequence,
  category,
  filterParams,
  completed,
  accepted,
  declined,
}: Partial<MatchSession>) {
  return new MatchSession(
    host,
    guest,
    region,
    lang,
    hostSequenceCounter,
    guestSequenceCounter,
    hostLikedFilms,
    guestLikedFilms,
    matchedFilms,
    matchLimit,
    filmsIdsSequence,
    category,
    filterParams,
    completed,
    accepted,
    declined
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
    const filmsIdsSequence = await this.filmService.getFilmsByCategory(
      INITIAL_PAGES,
      data.category,
      data.lang
    )

    const host = await this.userRepository.findOne({
      where: { id: data.id },
    })
    const guest = await this.userRepository.findOne({
      where: { id: data.guestId },
    })

    const matchSessionObj = matchSessionFactory({
      host: new User({ id: host.id, userName: host.userName }),
      guest: new User({ id: guest.id, userName: guest.userName }),
      region: data.region,
      lang: data.lang,
      hostSequenceCounter: 0,
      guestSequenceCounter: 0,
      hostLikedFilms: [],
      guestLikedFilms: [],
      matchedFilms: [],
      matchLimit: data.matchLimit,
      filmsIdsSequence,
      category: data.category,
      filterParams: JSON.stringify(data.filterParams),
      completed: false,
      accepted: false,
      declined: false,
    })

    //create matchSession
    const matchSession = await this.matchSessionRepository.create(
      matchSessionObj
    )
    await this.matchSessionRepository.save(matchSession)

    host.activeSessions = [...host.activeSessions, matchSession.id]
    guest.sessionsInvite = [...guest.sessionsInvite, matchSession.id]

    await this.userRepository.update({ id: host.id }, { ...host })
    await this.userRepository.update({ id: guest.id }, { ...guest })

    this.appGetaway.emitToClient(
      guest.id.toString(),
      MatchSessionSocketEvents.PushNewMatchSession,
      matchSession
    )

    return matchSession
  }

  async update(id: string, matchSession: MatchSession) {
    await this.matchSessionRepository.update({ id }, { ...matchSession })

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
      .where('match_session.id = :id', { id: matchSession.id })
      .getOne()

    //Пушить сессию у которой поменялся статус, что бы у хоста обновился список активных игр
    // this.appGetaway.emitToClient(
    //   guest.id.toString(),
    //   MatchSessionSocketEvents.PushNewMatchSession,
    //   matchSession
    // )

    return updateMatchSession
  }

  async delete(id: string) {
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

  async approveFilm(data: UpdateMatchSessionDTO) {
    const matchSession = await this.matchSessionRepository.findOne({
      where: { id: data.matchSessionId },
    })

    //increment users counter
    if (data.userId === matchSession.host.id) {
      matchSession.hostSequenceCounter++
    } else {
      matchSession.guestSequenceCounter++
    }

    let isMatched = false
    if (data.userId === matchSession.host.id && data.filmApproved) {
      //if film was liked by user, push new id to liked films array
      matchSession.hostLikedFilms.push(data.filmId)
      //check for matches isMatched: true?
      isMatched = matchSession.guestLikedFilms.includes(data.filmId)
    } else if (data.userId !== matchSession.host.id && data.filmApproved) {
      matchSession.guestLikedFilms.push(data.filmId)
      isMatched = matchSession.hostLikedFilms.includes(data.filmId)
    }

    //update matchedFilms array
    if (isMatched) {
      matchSession.matchedFilms.push(data.filmId)
    }

    let completed = matchSession.matchedFilms.length >= matchSession.matchLimit

    //update matchSession
    const {
      id,
      hostSequenceCounter,
      guestSequenceCounter,
      hostLikedFilms,
      guestLikedFilms,
      matchedFilms,
      matchLimit,
    } = await this.matchSessionRepository.save(matchSession)

    return {
      id,
      completed,
      isMatched,
      matchedFilms,
      matchLimit,
      hostSequenceCounter,
      guestSequenceCounter,
      hostLikedFilms,
      guestLikedFilms,
    }
  }
}
