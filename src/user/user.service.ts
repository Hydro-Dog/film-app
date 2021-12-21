import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MatchSessionEntity } from 'src/entity/match-session.entity'
import { UserEntity } from 'src/entity/user.entity'
import { GetMatchSessionDTO } from 'src/match-session/match-session.dto'
import { MatchSessionService } from 'src/match-session/match-session.service'
import { Repository } from 'typeorm'
import { CreateUserDTO, UserDTO } from './user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    // @InjectRepository(MatchSessionEntity)
    // private MatchSessionRepository: Repository<MatchSessionEntity>,
    private matchSessionService: MatchSessionService
  ) {}

  async getUser(query: Partial<UserEntity>) {
    let user: UserEntity
    if (query?.email) {
      user = await this.userRepository.findOne({
        where: [{ email: query.email }],
      })
    } else if (query?.username) {
      user = await this.userRepository.findOne({
        where: [{ username: query.username }],
      })
    } else if (query?.id) {
      user = await this.userRepository.findOne({
        where: [{ id: query.id }],
      })
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    return user
  }

  async updateUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: [{ id: userData.id }],
    })

    if (user) {
      await this.userRepository.update(userData.id, {
        ...user,
        ...userData,
      })
      const userUpdated = await this.userRepository.findOne({
        where: [{ id: userData.id }],
      })
      return new UserEntity(userUpdated)
    }
    throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
  }

  async getUserMatchSession(user_id: string) {
    const matchSession =
      this.matchSessionService.getMatchSessionByUserId(user_id)

    if (matchSession) {
      return matchSession
    } else {
      throw new HttpException(
        'No match sessions for user',
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
