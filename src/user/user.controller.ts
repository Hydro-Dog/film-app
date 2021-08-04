import {
  Controller,
  Get,
  Query,
  UseGuards,
  Response,
  Param,
} from '@nestjs/common'
import { UserService } from './user.service'
// import { AuthGuard } from '@nestjs/passport'
import { UserDTO } from './user.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(AuthGuard)
  getAll() {
    return this.userService.getAll()
  }

  @Get('api/users/:id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id) {
    return this.userService.getUser(id)
  }

  @Get('api/users/username')
  getByUserName(
    @Query() data: Pick<UserDTO, 'userName'>,
    @Response() res: any
  ) {
    return this.userService.findByUserName(data, res)
  }

  @Get('api/users/email')
  getByEmail(@Query() data: Pick<UserDTO, 'email'>, @Response() res: any) {
    return this.userService.findByEmail(data, res)
  }

  @Get('api/users/phoneNumber')
  getByPhoneNumber(
    @Query() data: Pick<UserDTO, 'phoneNumber'>,
    @Response() res: any
  ) {
    return this.userService.findByPhoneNumber(data, res)
  }
}
