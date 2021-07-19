import { Get, Post, Query } from '@nestjs/common'
import { Body } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { UserDTO } from 'src/user/user.dto'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() data: Pick<UserDTO, 'userName' | 'password'>) {
    return this.authService.login(data)
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    console.log('data: ', data)
    return this.authService.register(data)
  }

  @Get('confirm')
  confirm(@Query() { token, userName }) {
    return this.authService.confirm(token, userName)
  }
}
