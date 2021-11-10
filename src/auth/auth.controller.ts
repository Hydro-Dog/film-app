import { Get, Post, Query, Headers } from '@nestjs/common'
import { Body } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { UserDTO } from 'src/user/user.dto'
import { AuthService } from './auth.service'
import { User } from 'src/shared/user-id.decorator'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() data: Pick<UserDTO, 'userName' | 'password'>) {
    return this.authService.login(data)
  }

  @Post('logout')
  logout(@User() data: { userId: string }) {
    return this.authService.logout(data.userId)
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    console.log('data: ', data)
    return this.authService.register(data)
  }

  @Get('confirm')
  confirm(@Query() { token, userName }) {
    return this.authService.confirmUser(token, userName)
  }

  @Post('refresh')
  refresh(@Headers() headers, @Body() { refreshToken }) {
    return this.authService.refresh(headers, refreshToken)
  }
}
