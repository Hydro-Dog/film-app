import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { User } from 'src/shared/user-id.decorator'
import {
  CreateMatchSessionDTO,
  UpdateMatchSessionDTO,
} from './match-session.dto'
import { MatchSessionService } from './match-session.service'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  @Post('api/matchsession')
  create(@User() data: CreateMatchSessionDTO) {
    console.log('data: ', data)
    return this.matchSessionService.create(data)
  }

  //untested
  @Get('api/matchsession/:id')
  getByUserId(@Param() { id }, @Query() { scope }) {
    return this.matchSessionService.getByUserId(id, scope)
  }

  @Post('api/approvefilm')
  approveFilm(@Body() data: UpdateMatchSessionDTO) {
    return this.matchSessionService.approveFilm(data)
  }
}
