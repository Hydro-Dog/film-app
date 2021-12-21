import { Controller, Get, UseGuards, Query, Body, Put } from '@nestjs/common'
import { FilmderAuthGuard } from 'src/auth/auth.guard'
import { UserEntity } from 'src/entity/user.entity'
import { UserID } from 'src/shared/user-id.decorator'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(FilmderAuthGuard)
  @Get('api/currentuserprofile')
  getCurrentUser(@UserID() { user_id }) {
    return this.userService.getUser({ id: user_id })
  }

  @UseGuards(FilmderAuthGuard)
  @Put('api/currentuserprofile')
  updateCurrentUser(@Body() user: UserEntity) {
    return this.userService.updateUser(user)
  }

  @Get('api/user')
  getUser(@Query() query: Partial<UserEntity>) {
    return this.userService.getUser(query)
  }

  @Get('api/usermatchsessions')
  getUserMatchSessions(@UserID() userData: { user_id: string }) {
    return this.userService.getUserMatchSession(userData.user_id)
  }
}
