import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserDTO } from './user.dto'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private userServide: UserService) {}

  @Get('api/users')
  getAll() {
    return this.userServide.getAll()
  }

  @Post('login')
  login(@Body() data: Pick<UserDTO, 'email' | 'password'>) {
    return this.userServide.login(data)
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    console.log('controller data: ----------------', data)
    return this.userServide.register(data)
  }
}
