import {
  Controller,
  Get,
  Query,
  UseGuards,
  Response,
  Param,
  Put,
  Body,
  Req,
} from '@nestjs/common'
import { UserService } from './user.service'
// import { AuthGuard } from '@nestjs/passport'
import { UserDTO } from './user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { User } from 'src/shared/user-id.decorator'
import { SlowBuffer } from 'buffer'

@Controller()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  getAll() {
    return this.userService.getAll()
  }

  @Get('api/users/userId')
  getUser(@Query() userId: { id: number }) {
    console.log('getUser: ', userId)
    return this.userService.getUser(userId.id)
  }

  @Put('api/users')
  updateUser(@User() user) {
    console.log('useruseruser: ', user)
    return this.userService.updateUser(user.id, user)
  }

  @Get('api/users/username')
  getByUserName(
    @Query() userName: Pick<UserDTO, 'userName'>,
    @Response() res: any
  ) {
    console.log('getByUserName: ', userName)
    return this.userService.findByUserName(userName, res)
  }

  @Get('api/users/email')
  getByEmail(@Query() email: Pick<UserDTO, 'email'>, @Response() res: any) {
    console.log('getByEmail: ', email)
    return this.userService.findByEmail(email, res)
  }

  @Get('api/users/phoneNumber')
  getByPhoneNumber(
    @Query() phoneNumber: Pick<UserDTO, 'phoneNumber'>,
    @Response() res: any
  ) {
    console.log('getByPhoneNumber: ', phoneNumber)
    return this.userService.findByPhoneNumber(phoneNumber, res)
  }
}
