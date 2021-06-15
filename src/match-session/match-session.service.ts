import { HttpService, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MatchSession } from './match-session.entity'

@Injectable()
export class MatchSessionService {
  constructor(
    @InjectRepository(MatchSession)
    private httpService: HttpService
  ) {}
}
