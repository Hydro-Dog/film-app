import { Controller, Get, Query, UseGuards, Response } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'
import { UserDTO } from './user.dto'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.userService.getAll()
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
}
