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

// @UseGuards(AuthGuard)
@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  @Post('api/matchsession')
  create(@User() data: CreateMatchSessionDTO) {
    console.log('data: ', data)
    return this.matchSessionService.create(data)
  }

  //untested
  // @Get('api/matchsession/:id')
  // getByUserId(@Param() { id }, @Query() { userstatus, accepted }) {
  //   return this.matchSessionService.getByUserId(id, userstatus, accepted)
  // }

  /**
   * Return all match session where the user is host or guest.
   * @param id - user id.
   */
  @Get('api/activematchsession/:id')
  getCurrentMatchSessionByUserId(@Param() { id }) {
    return this.matchSessionService.getCurrentMatchSessionByUserId(id)
  }

  /**
   * Return all unaccepted match session where the user is guest.
   * @param id - user id.
   */
  @Get('api/invitesmatchsession/:id')
  getInvitesMatchSessionByUserId(@Param() { id }) {
    return this.matchSessionService.getInvitesMatchSessionByUserId(id)
  }

  @Post('api/approvefilm')
  approveFilm(@Body() data: UpdateMatchSessionDTO) {
    return this.matchSessionService.approveFilm(data)
  }
}
