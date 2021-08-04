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

  async getAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find()
    return users.map((user) => user.sanitizeUser())
  }

  async getUser(id: number) {
    console.log('getUser: ', id)
    const user = await this.userRepository.findOne({
      where: [{ id }],
    })
    if (!user) {
      throw new HttpException('Username not found', HttpStatus.BAD_REQUEST)
    }
    return user.sanitizeUser()
  }

  async findByUserName(payload: Pick<UserDTO, 'userName'>, res) {
    const { userName } = payload
    const users = await this.userRepository.find()
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
    if (user) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST)
    }
    return res.status(HttpStatus.OK).json({ isAvailable: true })
  }

  async findByPhoneNumber(payload: Pick<UserDTO, 'phoneNumber'>, res) {
    const { phoneNumber } = payload
    const user = await this.userRepository.findOne({
      where: [{ phoneNumber }],
    })
    if (user) {
      throw new HttpException(
        'Phone number Is already taken',
        HttpStatus.BAD_REQUEST
      )
    }
    return res.status(HttpStatus.OK).json({ isAvailable: true })
  }
}
