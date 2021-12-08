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
// import { AuthGuard } from 'src/auth/auth.guard'
import { MatchSession } from 'src/entity/match-session.entity'

// @UseGuards(AuthGuard)
@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  // @Post('api/matchsession')
  // create(@User() data: CreateMatchSessionDTO) {
  //   return this.matchSessionService.create(data)
  // }

  /**
   * Return all match session where the user is host or guest.
   * @param userId
   * @param matchSessionId
   */
  @Get('api/matchsession')
  getMatchSession(@Query() { userId, matchSessionId }) {
    if (userId) {
      return this.matchSessionService.getMatchSessionByUserId(userId)
    } else if (matchSessionId) {
      return this.matchSessionService.getMatchSessionById(matchSessionId)
    }
  }

  // @Post('api/swipefilm')
  // swipeFilm(
  //   @User()
  //   data: {
  //     matchSessionId: number
  //     filmJSON: string
  //     userId: number
  //     swipeDirection: 'left' | 'right'
  //   }
  // ) {
  //   return this.matchSessionService.swipe(
  //     data.matchSessionId,
  //     data.filmJSON,
  //     data.userId,
  //     data.swipeDirection
  //   )
  // }

  @Delete('api/matchsession')
  deleteMatchSession(@User() data: { matchSessionId: number; userId: number }) {
    return this.matchSessionService.deleteMatchSession(
      data.matchSessionId,
      data.userId
    )
  }

  // @Put('api/matchsession/:id')
  // update(@Param() { id }, @Body() matchSession: MatchSession) {
  //   return this.matchSessionService.update(id, matchSession)
  // }

  // @Delete('api/matchsession/:id')
  // delete(@Param() { id }, @Body() matchSession: MatchSession) {
  //   return this.matchSessionService.delete(id)
  // }
}
