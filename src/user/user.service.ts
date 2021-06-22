import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDTO, UserRO } from './user.dto'
import { User } from './user.entity'
import * as jwt from 'jsonwebtoken'

// ???
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find()
    return users.map((user) => user.toResponseObject())
  }

  async login(data: Pick<UserDTO, 'email' | 'password'>) {
    const { email, password } = data
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST
      )
    }
    user.token = this.getToken(user.id)
    await this.userRepository.update(user.id, user)

    return user.toResponseObject(true)
  }

  async register(data: UserDTO) {
    const { email, phoneNumber } = data
    let user = await this.userRepository.findOne({
      where: [{ email }, { phoneNumber }],
    })
    if (user) {
      throw new HttpException(
        'User with such email or phone number already exist',
        HttpStatus.BAD_REQUEST
      )
    }

    user = await this.userRepository.create(data)
    user.sessionsInvite = []
    user.activeSessions = []
    await this.userRepository.save(user)
    return user.toResponseObject()
  }

  getToken(id: string) {
    return jwt.sign(id, process.env.SECRET)
  }
}
