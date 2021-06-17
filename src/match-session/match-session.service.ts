import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FilmService } from 'src/film/film.service'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { threadId } from 'worker_threads'
import { MatchSessionDTO } from './match-session.dto'
import { MatchSession } from './match-session.entity'

@Injectable()
export class MatchSessionService {
  constructor(
    @InjectRepository(MatchSession)
    private matchSessionRepository: Repository<MatchSession>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private filmService: FilmService
  ) {}

  async create(data: MatchSessionDTO) {
    //generates filmsIdsSequence
    let filmsIdsSequence: string[]
    if (data.category) {
      filmsIdsSequence = await this.filmService.getFilmsByCategory(
        '1,2,3',
        data.category
      )
    } else {
      filmsIdsSequence = await this.filmService.getFilmsByFilters(
        '1,2,3',
        data.filterParams
      )
    }

    const hostSequenceCounter = 0
    const guestSequenceCounter = 0
    const hostLikedFilms = []
    const guestLikedFilms = []
    const matchedFilms = []
    const matchesLimit = data.matchesLimit

    const matchSessionObj: Partial<MatchSession> = {
      hostId: data.hostId,
      guestId: data.guestId,
      hostSequenceCounter,
      guestSequenceCounter,
      hostLikedFilms,
      guestLikedFilms,
      matchedFilms,
      matchesLimit,
      filmsIdsSequence,
      category: data.category,
      filterParams: JSON.stringify(data.filterParams),
    }

    //create matchSession
    const matchSession = await this.matchSessionRepository.create(
      matchSessionObj
    )
    await this.matchSessionRepository.save(matchSession)

    //update participants tables

    const host = await this.userRepository.findOne({
      where: { id: data.hostId },
    })
    const guest = await this.userRepository.findOne({
      where: { id: data.guestId },
    })

    console.log('host: ', host)

    host.activeSessions = [...host.activeSessions, matchSession.id]
    guest.sessionsInvite = [...guest.sessionsInvite, matchSession.id]

    await this.userRepository.save({ id: host.id, ...host })
    await this.userRepository.save({ id: guest.id, ...guest })

    return matchSession
  }
}
