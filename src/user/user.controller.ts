import {
  Controller,
  Get,
  Query,
  UseGuards,
  Response,
  Put,
  Post,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserDTO } from './user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { User } from 'src/shared/user-id.decorator'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('api/users')
  getAll() {
    return this.userService.getAll()
  }

  @Get('api/users/userId')
  getUser(@Query() userId: { id: number }) {
    return this.userService.getUser(userId.id)
  }

  @UseGuards(AuthGuard)
  @Put('api/users')
  updateUser(@User() user) {
    return this.userService.updateUser(user.id, user)
  }

  @UseGuards(AuthGuard)
  @Post('api/users/checkUserName')
  checkByUserName(@User() user: Partial<UserDTO>, @Response() res: any) {
    return this.userService.checkUserName(user, res)
  }

  @UseGuards(AuthGuard)
  @Post('api/users/checkPhoneNumber')
  checkByPhoneNumber(@User() user: Partial<UserDTO>, @Response() res: any) {
    return this.userService.checkPhoneNumber(user, res)
  }

  @Get('api/users/username')
  getByUserName(
    @Query() userName: Pick<UserDTO, 'userName'>,
    @Response() res: any
  ) {
    return this.userService.findByUserName(userName, res)
  }

  @Get('api/users/email')
  getByEmail(@Query() email: Pick<UserDTO, 'email'>, @Response() res: any) {
    return this.userService.findByEmail(email, res)
  }

  @Get('api/users/phoneNumber')
  getByPhoneNumber(
    @Query() phoneNumber: Pick<UserDTO, 'phoneNumber'>,
    @Response() res: any
  ) {
    return this.userService.findByPhoneNumber(phoneNumber, res)
  }
}
