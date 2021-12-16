import {
  Post,
  UseGuards,
  Request,
  Headers,
  Body,
  Query,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { CreateUserDTO, LoginUserDTO, UserDTO } from 'src/user/user.dto'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './strategies/local-auth.guard'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() data: LoginUserDTO) {
    return this.authService.login(data)
  }

  // @Get('google')
  // @UseGuards(GoogleAuthGuard)
  // async googleAuth(@Request() req) {}

  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // googleAuthRedirect(@Request() req) {
  //   return this.authService.googleLogin(req.user)
  // }

  // @Get('vkontakte')
  // @UseGuards(VkontakteAuthGuard)
  // async vkontakteAuth(@Request() req) {}

  // @Get('vkontakte/redirect')
  // @UseGuards(VkontakteAuthGuard)
  // vkontakteAuthRedirect(@Request() req) {
  //   return this.authService.vkontakteLogin(req.user)
  // }

  // @Post('logout')
  // logout(@User() data: { userId: string }) {
  //   return this.authService.logout(data.userId)
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() data: CreateUserDTO) {
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
