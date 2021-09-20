import { Body, Controller, Post } from '@nestjs/common'
import { User } from 'src/shared/user-id.decorator'
import {
  CreateMatchSessionDTO,
  UpdateMatchSessionDTO,
} from './match-session.dto'
import { MatchSessionService } from './match-session.service'

@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  @Post('api/matchsession')
  create(@User() data: CreateMatchSessionDTO) {
    console.log('data: ', data)
    return this.matchSessionService.create(data)
  }

  @Post('api/approvefilm')
  approveFilm(@Body() data: UpdateMatchSessionDTO) {
    return this.matchSessionService.approveFilm(data)
  }
}
