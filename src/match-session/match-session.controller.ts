import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { MatchSession } from './match-session.entity'

// @UseGuards(AuthGuard)
@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  @Post('api/matchsession')
  create(@User() data: CreateMatchSessionDTO) {
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
  // @Get('api/activematchsession/:id')
  // getCurrentMatchSessionByUserId(@Param() { id }) {
  //   return this.matchSessionService.getCurrentMatchSessionByUserId(id)
  // }

  /**
   * Return all match session where the user is host or guest.
   * @param id - user id.
   */
  @Get('api/matchsession')
  getMatchSessionByUserId(@Query() { userId, matchSessionId }) {
    if (userId) {
      return this.matchSessionService.getMatchSessionByUserId(userId)
    } else if (matchSessionId) {
      return this.matchSessionService.getMatchSessionById(matchSessionId)
    }
  }

  /**
   * Return all unaccepted match session where the user is guest.
   * @param id - user id.
   */
  // @Get('api/unapprovedmatchsession/:id')
  // getInvitesMatchSessionByUserId(@Param() { id }) {
  //   return this.matchSessionService.getInvitesMatchSessionByUserId(id)
  // }

  @Post('api/approvefilm')
  approveFilm(
    @User() data: { matchSessionId: number; filmId: number; userId: number }
  ) {
    console.log(' approveFilmV2 data: ', data)
    return this.matchSessionService.approveFilmV2(
      data.matchSessionId,
      data.filmId,
      data.userId
    )
  }

  @Put('api/matchsession/:id')
  update(@Param() { id }, @Body() matchSession: MatchSession) {
    console.log(' id: ', id, 'matchSession: ', matchSession)
    return this.matchSessionService.update(id, matchSession)
  }

  @Delete('api/matchsession/:id')
  delete(@Param() { id }, @Body() matchSession: MatchSession) {
    return this.matchSessionService.delete(id)
  }
}
