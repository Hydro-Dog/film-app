import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { sign } from 'jsonwebtoken'
import { UserDTO } from 'src/user/user.dto'
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async confirm(token: string, userName: string) {
    const isValid = await bcrypt.compare(userName + process.env.SECRET, token)
    console.log('isValid: ', isValid)
    if (isValid) {
      const user = await this.userRepository.findOne({ where: { userName } })
      user.emailConfirmed = true
      this.userRepository.save(user)
      return 'Account confirmed'
    } else {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }

  async signPayload(payload: any) {
    return sign(payload, process.env.SECRET, { expiresIn: '12h' })
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload)
  }

  async getToken(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async login(data: Pick<UserDTO, 'userName' | 'password'>) {
    const { userName, password } = data
    const user = await this.userRepository.findOne({ where: { userName } })
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST
      )
    }
    const payload = {
      userName: user.userName,
      id: user.id,
    }

    const token = await this.signPayload(payload)
    user.token = token
    await this.userRepository.update(user.id, user)
    const responseUser = user.sanitizeUser()

    return { user: responseUser, token }
  }

  async register(data: UserDTO) {
    const { email, userName } = data
    let user = await this.userRepository.findOne({
      where: [{ email }, { userName }],
    })
    if (user) {
      throw new HttpException(
        'User with such email or user name number already exist',
        HttpStatus.BAD_REQUEST
      )
    }

    user = await this.userRepository.create(data)

    user.password = await this.hashPassword(data.password)
    user.sessionsInvite = []
    user.activeSessions = []
    user.emailConfirmed = false
    console.log('user.userName: ', user.userName)
    const token = await bcrypt.hash(user.userName + process.env.SECRET, 10)
    await this.sendUserConfirmation(user, token)
    await this.userRepository.save(user)

    const payload = {
      userName: user.userName,
      id: user.id,
    }

    return { id: user.id }
  }

  async sendUserConfirmation(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './registration-confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.firstName,
        userName: user.userName,
        token,
      },
    })

    console.log('sent!!')
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
