import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDTO, UserRO } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findByPayload(payload: any) {
    const { userName } = payload
    return await this.userRepository.findOne({ userName })
  }

  async getAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find()
    return users.map((user) => user.sanitizeUser())
  }

  async findByUserName(payload: Pick<UserDTO, 'userName'>, res) {
    const { userName } = payload
    const user = await this.userRepository.findOne({
      where: [{ userName }],
    })
    if (user) {
      throw new HttpException(
        'Username is already taken',
        HttpStatus.BAD_REQUEST
      )
    }
    return res.status(HttpStatus.OK).json({ isAvailable: true })
  }

  async findByEmail(payload: Pick<UserDTO, 'email'>, res) {
    const { email } = payload
    const user = await this.userRepository.findOne({
      where: [{ email }],
    })
    console.log('user: ', user)
    if (user) {
      throw new HttpException('Email are already taken', HttpStatus.BAD_REQUEST)
    }
    return res.status(HttpStatus.OK).json({ isAvailable: true })
  }

  // async login(data: Pick<UserDTO, 'email' | 'password'>) {
  //   const { email, password } = data
  //   const user = await this.userRepository.findOne({ where: { email } })
  //   if (!user || !(await user.comparePassword(password))) {
  //     throw new HttpException(
  //       'Invalid username/password',
  //       HttpStatus.BAD_REQUEST
  //     )
  //   }
  //   const payload = {
  //     userName: user.userName,
  //     id: user.id,
  //   }

  //   const token = await this.authService.signPayload(payload)
  //   await this.userRepository.update(user.id, user)

  //   return { user, token }
  // }

  // async register(data: UserDTO) {
  //   const { email, userName } = data
  //   let user = await this.userRepository.findOne({
  //     where: [{ email }, { userName }],
  //   })
  //   if (user) {
  //     throw new HttpException(
  //       'User with such email or phone number already exist',
  //       HttpStatus.BAD_REQUEST
  //     )
  //   }

  //   user = await this.userRepository.create(data)
  //   user.sessionsInvite = []
  //   user.activeSessions = []
  //   await this.userRepository.save(user)
  //   return user.sanitizeUser()
  // }
}
