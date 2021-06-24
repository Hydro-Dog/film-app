import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { sign } from 'jsonwebtoken'
import { UserDTO } from 'src/user/user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

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
        'User with such email or phone number already exist',
        HttpStatus.BAD_REQUEST
      )
    }

    user = await this.userRepository.create(data)

    user.password = await this.hashPassword(data.password)
    user.sessionsInvite = []
    user.activeSessions = []
    await this.userRepository.save(user)

    const payload = {
      userName: user.userName,
      id: user.id,
    }

    return { id: user.id }
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
