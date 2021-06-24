import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.userService.getAll()
  }
}
