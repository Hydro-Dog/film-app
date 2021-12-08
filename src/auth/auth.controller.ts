import { Get, Post, Query, Headers, UseGuards, Request } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './strategies/google.guard'
import { LocalAuthGuard } from './strategies/local-auth.guard'
import { VkontakteAuthGuard } from './strategies/vkontakte-auth.guard'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req.user)
  }

  @Get('vkontakte')
  @UseGuards(VkontakteAuthGuard)
  async vkontakteAuth(@Request() req) {}

  @Get('vkontakte/redirect')
  @UseGuards(VkontakteAuthGuard)
  vkontakteAuthRedirect(@Request() req) {
    return this.authService.vkontakteLogin(req.user)
  }

  // @Post('login')
  // login(@Body() data: Pick<UserDTO, 'userName' | 'password'>) {
  //   return this.authService.login(data)
  // }

  // @Post('logout')
  // logout(@User() data: { userId: string }) {
  //   return this.authService.logout(data.userId)
  // }

  // @Post('register')
  // register(@Body() data: UserDTO) {
  //   console.log('data: ', data)
  //   return this.authService.register(data)
  // }

  // @Get('confirm')
  // confirm(@Query() { token, userName }) {
  //   return this.authService.confirmUser(token, userName)
  // }

  // @Post('refresh')
  // refresh(@Headers() headers, @Body() { refreshToken }) {
  //   return this.authService.refresh(headers, refreshToken)
  // }
}
