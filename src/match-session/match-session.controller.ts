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
import { UserID } from 'src/shared/user-id.decorator'
import {
  CreateMatchSessionDTO,
  GetMatchSessionDTO,
  UpdateMatchSessionStatusDTO,
} from './match-session.dto'
import { MatchSessionService } from './match-session.service'
// import { AuthGuard } from 'src/auth/auth.guard'
import { MatchSessionEntity } from 'src/entity/match-session.entity'

// @UseGuards(FilmderAuthGuard)
@Controller()
export class MatchSessionController {
  constructor(private matchSessionService: MatchSessionService) {}

  @Get('api/matchsession')
  getMatchSession(@Query() query: GetMatchSessionDTO) {
    if (query.userId) {
      return this.matchSessionService.getMatchSessionByUserId(query.userId)
    } else if (query.matchSessionId) {
      return this.matchSessionService.getMatchSessionById(query.matchSessionId)
    }
  }

  @Post('api/matchsession')
  create(@Body() data: CreateMatchSessionDTO) {
    return this.matchSessionService.create(data)
  }

  @Post('api/matchsession/status')
  updateStatus(@Body() data: UpdateMatchSessionStatusDTO) {
    return this.matchSessionService.updateStatus(data)
  }

  // @Post('api/matchsession/accept')
  // accept(@Body() data: CreateMatchSessionDTO) {
  //   return this.matchSessionService.create(data)
  // }

  // @Post('api/matchsession/decline')
  // decline(@Body() data: CreateMatchSessionDTO) {
  //   return this.matchSessionService.create(data)
  // }

  // @Post('api/matchsession/continue')
  // continue(@Body() data: CreateMatchSessionDTO) {
  //   return this.matchSessionService.create(data)
  // }

  // @Post('api/matchsession/leave')
  // leave(@Body() data: CreateMatchSessionDTO) {
  //   return this.matchSessionService.create(data)
  // }

  // @Delete('api/matchsession')
  // deleteMatchSession(
  //   @UserID() data: { matchSessionId: number; userId: number }
  // ) {
  //   return this.matchSessionService.deleteMatchSession(
  //     data.matchSessionId,
  //     data.userId
  //   )
  // }

  // @Get('api/matchsession')
  // getMatchSession(@Query() { userId, matchSessionId }) {
  //   if (userId) {
  //     return this.matchSessionService.getMatchSessionByUserId(userId)
  //   } else if (matchSessionId) {
  //     return this.matchSessionService.getMatchSessionById(matchSessionId)
  //   }
  // }

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

  // @Put('api/matchsession/:id')
  // update(@Param() { id }, @Body() matchSession: MatchSession) {
  //   return this.matchSessionService.update(id, matchSession)
  // }

  // @Delete('api/matchsession/:id')
  // delete(@Param() { id }, @Body() matchSession: MatchSession) {
  //   return this.matchSessionService.delete(id)
  // }
}
