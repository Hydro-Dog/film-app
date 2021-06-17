import { Body, Controller, Post } from '@nestjs/common'
import { MatchSessionDTO } from './match-session.dto'
import { MatchSessionService } from './match-session.service'

@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  @Post('api/matchsession')
  create(@Body() data: MatchSessionDTO) {
    return this.matchSessionService.create(data)
  }
}
