import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common'
import { FilmderAuthGuard } from 'src/auth/auth.guard'
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard'
import { UserEntity } from 'src/entity/user.entity'
import { UserID } from 'src/shared/user-id.decorator'
import { CreateUserDTO } from './user.dto'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('req: ', req)
    return req.user
  }

  @Get('api/user')
  getUser(@Query() query: Partial<UserEntity>) {
    return this.userService.getUser(query)
  }

  @UseGuards(FilmderAuthGuard)
  @Get('api/currentuser')
  getCurrentUser(@UserID() { user_id }) {
    return this.userService.getUser({ id: user_id })
  }

  // @UseGuards(AuthGuard)
  // @Get('api/users')
  // getAll() {
  //   return this.userService.getAll()
  // }

  // @Get('api/users/userId')
  // getUser(@Query() userId: { id: number }) {
  //   return this.userService.getUser(userId.id)
  // }

  // @UseGuards(AuthGuard)
  // @Put('api/users')
  // updateUser(@Body() user: UserDTO) {
  //   return this.userService.updateUser(user.id, user)
  // }
  // @UseGuards(AuthGuard)
  // @Post('api/users/checkUserName')
  // checkByUserName(
  //   @User() user: { userName: string; userId: string },
  //   @Response() res: any
  // ) {
  //   return this.userService.checkUserName(user, res)
  // }

  // @UseGuards(AuthGuard)
  // @Post('api/users/checkPhoneNumber')
  // checkByPhoneNumber(
  //   @User() user: { phoneNumber: string; userId: string },
  //   @Response() res: any
  // ) {
  //   return this.userService.checkPhoneNumber(user, res)
  // }

  // @Get('api/users/username')
  // getByUserName(
  //   @Query() userName: Pick<UserDTO, 'userName'>,
  //   @Response() res: any
  // ) {
  //   return this.userService.findByUserName(userName, res)
  // }

  // @Get('api/users/email')
  // getByEmail(@Query() email: Pick<UserDTO, 'email'>, @Response() res: any) {
  //   return this.userService.findByEmail(email, res)
  // }

  // @Get('api/users/phoneNumber')
  // getByPhoneNumber(
  //   @Query() phoneNumber: Pick<UserDTO, 'phoneNumber'>,
  //   @Response() res: any
  // ) {
  //   return this.userService.findByPhoneNumber(phoneNumber, res)
  // }
}
