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

  async updateUser(id: number, payload: Partial<UserDTO>): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: [{ id }] })
    if (user) {
      await this.userRepository.update(id, {
        ...user,
        ...payload,
      })
      const userUpdated = await this.userRepository.findOne({ where: [{ id }] })
      return userUpdated.sanitizeUser()
    }
    throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
  }

  async getAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find()
    return users.map((user) => user.sanitizeUser())
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: [{ id }],
    })
    if (!user) {
      throw new HttpException('Username not found', HttpStatus.BAD_REQUEST)
    }
    return user.sanitizeUser()
  }

  async findByUserName(userPayload: Partial<UserDTO>, res) {
    const { userName } = userPayload
    const user = await this.userRepository.findOne({
      where: [{ userName }],
    })
    return user
      ? res.status(HttpStatus.OK).json({ user: user.sanitizeUser() })
      : res.status(HttpStatus.OK).json({ user: null })
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
        'Phone number is already taken',
        HttpStatus.BAD_REQUEST
      )
    }
    return res.status(HttpStatus.OK).json({ isAvailable: true })
  }

  async checkUserName(userPayload: { userName: string; userId: string }, res) {
    const { userName } = userPayload
    const user = await this.userRepository.findOne({
      where: [{ userName }],
    })
    if (user && user.id !== userPayload.userId) {
      throw new HttpException(
        'Username is already taken',
        HttpStatus.BAD_REQUEST
      )
    }
    return res.status(HttpStatus.OK).json({ isAvailable: true })
  }

  async checkPhoneNumber(
    userPayload: { phoneNumber: string; userId: string },
    res
  ) {
    const { phoneNumber } = userPayload
    const user = await this.userRepository.findOne({
      where: [{ phoneNumber }],
    })
    if (user && user.id !== userPayload.userId) {
      throw new HttpException(
        'Phone number is already taken',
        HttpStatus.BAD_REQUEST
      )
    }
    return res.status(HttpStatus.OK).json({ isAvailable: true })
  }
}
