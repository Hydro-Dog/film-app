import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Socket } from 'socket.io'
import { FilmService } from 'src/film/film.service'
import { User } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import {
  CreateMatchSessionDTO,
  UpdateMatchSessionDTO,
} from './match-session.dto'
import { MatchSession } from './match-session.entity'
import { SearchMatchSessionUserStatus } from './match-session.model'

@Injectable()
export class MatchSessionService {
  constructor(
    // private socket: Socket,
    @InjectRepository(MatchSession)
    private matchSessionRepository: Repository<MatchSession>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private filmService: FilmService
  ) {}

  async create(data: CreateMatchSessionDTO) {
    console.log('data: ', data)
    //generates filmsIdsSequence
    let filmsIdsSequence: string[]
    if (data.category) {
      filmsIdsSequence = await this.filmService.getFilmsByCategory(
        '1,2',
        data.category,
        data.lang
      )
      // } else {
      //   filmsIdsSequence = await this.filmService.getFilmsByFilters(
      //     '1,2',
      //     data.filterParams
      //   )
    }

    console.log('filmsIdsSequence: ', filmsIdsSequence)

    const hostSequenceCounter = 0
    const guestSequenceCounter = 0
    const hostLikedFilms = []
    const guestLikedFilms = []
    const matchedFilms = []
    const matchLimit = data.matchLimit

    //update participants tables
    const host = await this.userRepository.findOne({
      where: { id: data.clientId },
    })
    const guest = await this.userRepository.findOne({
      where: { id: data.guestId },
    })

    const matchSessionObj: Partial<MatchSession> = {
      hostId: data.clientId,
      guestId: data.guestId,
      hostSequenceCounter,
      guestSequenceCounter,
      hostLikedFilms,
      guestLikedFilms,
      matchedFilms,
      matchLimit,
      filmsIdsSequence,
      category: data.category,
      filterParams: JSON.stringify(data.filterParams),
      completed: false,
      accepted: false,
    }

    //create matchSession
    const matchSession = await this.matchSessionRepository.create(
      matchSessionObj
    )
    await this.matchSessionRepository.save(matchSession)

    host.activeSessions = [...host.activeSessions, matchSession.id]
    guest.sessionsInvite = [...guest.sessionsInvite, matchSession.id]

    console.log('host.activeSessions: ', host.id, host.activeSessions)
    console.log('guest.activeSessions: ', guest.id, guest.activeSessions)

    await this.userRepository.save({ id: host.id, ...host })
    await this.userRepository.save({ id: guest.id, ...guest })

    // this.socket.emit('invite', { id: matchSession.id })

    return matchSession
  }

  async getCurrentMatchSessionByUserId(id: any) {
    return await this.matchSessionRepository
      .createQueryBuilder('match_session')
      .where('match_session.guestId = :id', { id })
      .orWhere('match_session.hostId = :id', { id })
      .getMany()
  }

  async getInvitesMatchSessionByUserId(id: any) {
    return await this.matchSessionRepository
      .createQueryBuilder('match_session')
      .where('match_session.guestId = :id', { id })
      .andWhere('match_session.accepted = :flag', { flag: true })
      .getMany()
  }

  // async getByUserId(
  //   id: number,
  //   userstatus: SearchMatchSessionUserStatus,
  //   accepted: boolean
  // ) {
  //   console.log('userstatus: ', userstatus)
  //   let query = this.matchSessionRepository.createQueryBuilder('match_session')

  //   if (userstatus === 'all') {
  //     console.log('here')
  //     return await query
  //       .where('match_session.guestId = :id', { id })
  //       .orWhere('match_session.hostId = :id', { id })
  //       .getMany()
  //   } else if (userstatus === 'host') {
  //     return await query.where('match_session.hostId = :id', { id }).getMany()
  //   } else if (userstatus === 'guest') {
  //     return await query.where('match_session.guestId = :id', { id }).getMany()
  //   }
  // }

  async approveFilm(data: UpdateMatchSessionDTO) {
    const matchSession = await this.matchSessionRepository.findOne({
      where: { id: data.matchSessionId },
    })

    //increment users counter
    if (data.userId === matchSession.hostId) {
      matchSession.hostSequenceCounter++
    } else {
      matchSession.guestSequenceCounter++
    }

    let isMatched = false
    if (data.userId === matchSession.hostId && data.filmApproved) {
      //if film was liked by user, push new id to liked films array
      matchSession.hostLikedFilms.push(data.filmId)
      //check for matches isMatched: true?
      isMatched = matchSession.guestLikedFilms.includes(data.filmId)
    } else if (data.userId !== matchSession.hostId && data.filmApproved) {
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
