import { Body, Controller, Post } from '@nestjs/common'
import {
  CreateMatchSessionDTO,
  UpdateMatchSessionDTO,
} from './match-session.dto'
import { MatchSessionService } from './match-session.service'

@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  @Post('api/matchsession')
  create(@Body() data: CreateMatchSessionDTO) {
    return this.matchSessionService.create(data)
  }

  @Post('api/approvefilm')
  approveFilm(@Body() data: UpdateMatchSessionDTO) {
    return this.matchSessionService.approveFilm(data)
  }
}
