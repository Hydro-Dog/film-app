import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDTO, LoginUserDTO, UserDTO } from 'src/user/user.dto'
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer'
import { UserEntity } from 'src/entity/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('username: ', username)
    const user = await this.userRepository.findOne({ where: { username } })
    console.log('user: ', user)
    //TODO: add bcrypt
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async register(userData: CreateUserDTO) {
    const emailExists = await this.checkForExistence('email', userData.email)
    const usernameExists = await this.checkForExistence(
      'username',
      userData.username
    )
    if (emailExists || usernameExists) {
      throw new HttpException(
        'User with such email or user name number already exist',
        HttpStatus.BAD_REQUEST
      )
    } else {
      return await this.createUser(userData)
    }
    // const { email, userName } = userData
    // let user = await this.userRepository.findOne({
    //   where: [{ email }, { userName }],
    // })
    // console.log('user: ', user)
    // if (user) {
    //   throw new HttpException(
    //     'User with such email or user name number already exist',
    //     HttpStatus.BAD_REQUEST
    //   )
    // }

    // user = await this.userRepository.create(userData)
    // console.log('user2: ', user)

    // user.password = await this.hashPassword(userData.password)
    // user.sessionsInvite = []
    // // user.activeSessions = []
    // user.currentMatchSession = null
    // user.emailConfirmed = false
    // const token = await bcrypt.hash(
    //   user.userName + process.env.CONFIRMATION_SECRET,
    //   10
    // )
    // console.log('HERE')
    // try {
    //   await this.sendUserConfirmation(user, token)
    // } catch (e) {
    //   console.log('error: ', e)
    // }

    // console.log('THERE')
    // await this.userRepository.save(user)

    // return { id: user.id }
  }

  async login(userData: LoginUserDTO) {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    })

    if (!user) {
      throw new HttpException('No such user', HttpStatus.BAD_REQUEST)
    }

    const accessToken = await this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: process.env.ACCESS_EXPIRATION,
        secret: process.env.JWT_SECRET,
      }
    )

    const refreshToken = await this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: process.env.REFRESH_EXPIRATION,
        secret: process.env.JWT_SECRET,
      }
    )

    const userUpdated = await this.userRepository.save({
      ...user,
      accessToken,
      refreshToken,
    })

    return new UserEntity(userUpdated)
  }

  // async googleLogin(userPayload: Partial<User>) {
  //   console.log('userPayload: ', userPayload)
  //   return await this.createOrFind(userPayload)
  // }

  // async vkontakteLogin(userPayload: Partial<User>) {
  //   return await this.createOrFind(userPayload)
  // }

  // async createOrFind(data: UserDTO) {
  //   const user = await this.checkIfUserEmailExists(data)

  //   if (!user) {
  //     return await this.createUser(data)
  //   }

  //   return user
  // }

  async checkForExistence(key: string, value: any) {
    return await this.userRepository.findOne({
      where: { [key]: value },
    })
  }

  async hashUserPassword(userData: CreateUserDTO): Promise<CreateUserDTO> {
    let password = await bcrypt.hash(userData.password + process.env.SAULT, 10)
    return { ...userData, password }
  }

  async sendUserConfirmation(user: CreateUserDTO) {
    const token = await bcrypt.hash(
      user.username + process.env.CONFIRMATION_SECRET,
      10
    )
    try {
      return await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to Filmder! Please, confirm your Email',
        template: './registration-confirmation',
        context: {
          name: user.firstName,
          username: user.username,
          token,
        },
      })
    } catch (error) {
      console.error('ERROR: ', error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async createUser(userData: CreateUserDTO) {
    try {
      const hashedUser = await this.hashUserPassword(userData)
      const user = await this.userRepository.create(hashedUser)
      await this.userRepository.save(user)

      const mailerResponse = await this.sendUserConfirmation(user)
      return new UserEntity({ user, ...mailerResponse })

      // return user
    } catch (error) {
      console.error('ERROR: ', error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async confirmUser(token: string, username: string) {
    const isValid = await bcrypt.compare(
      username + process.env.CONFIRMATION_SECRET,
      token
    )
    if (isValid) {
      const user = await this.userRepository.findOne({ where: { username } })
      user.emailConfirmed = true
      this.userRepository.save(user)
      return 'Account confirmed'
    } else {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
    }
  }

  async refresh(headers: any, refresh: string) {
    console.log('refresh::: ', refresh)
    try {
      this.jwtService.verify(refresh, { secret: process.env.JWT_SECRET })
    } catch (error) {
      throw new HttpException('Refresh expired', HttpStatus.BAD_REQUEST)
    }

    const payload = this.jwtService.decode(
      headers.authorization.split(' ')[1]
    ) as { [key: string]: any }

    console.log('payload: ', payload)

    const user = await this.userRepository.findOne({
      where: { id: payload.id },
    })

    console.log('user: ', user)

    const { accessToken } = await this.getAccessToken(user.id)

    user.accessToken = accessToken

    await this.userRepository.update(user.id, user)

    return new UserEntity(user)
  }

  // async login(data: Pick<UserDTO, 'userName' | 'password'>) {
  //   const { userName, password } = data
  //   const user = await this.userRepository.findOne({ where: { userName } })
  //   if (!user || !(await user.comparePassword(password))) {
  //     throw new HttpException(
  //       'Invalid username/password',
  //       HttpStatus.BAD_REQUEST
  //     )
  //   }

  //   const [{ accessToken }, { refreshToken }] = await Promise.all([
  //     this.getAccessToken(user.id),
  //     this.getRefreshToken(user.id),
  //   ])

  //   await this.userRepository.update(user.id, user)
  //   const responseUser = user.sanitizeUser()
  //   responseUser.refreshToken = refreshToken
  //   responseUser.accessToken = accessToken

  //   return responseUser
  // }

  // async logout(userId: string) {
  //   const user = await this.userRepository.findOne({ where: { id: userId } })
  //   if (!user) {
  //     throw new HttpException(
  //       'Who the duck are you looking for?',
  //       HttpStatus.BAD_REQUEST
  //     )
  //   }

  //   const loggedOutUser: Partial<User> = {
  //     ...user,
  //     accessToken: null,
  //     refreshToken: null,
  //   }
  //   await this.userRepository.update(user.id, loggedOutUser)

  //   return userId
  // }

  // async sendUserConfirmation(user: User, token: string) {
  //   await this.mailerService.sendMail({
  //     to: user.email,
  //     subject: 'Welcome to Filmder! Please, confirm your Email',
  //     template: './registration-confirmation',
  //     context: {
  //       name: user.firstName,
  //       userName: user.userName,
  //       token,
  //     },
  //   })
  // }

  // async hashPassword(password: string) {
  //   return await bcrypt.hash(password, 10)
  // }

  async getAccessToken(id: string) {
    const payload = {
      id,
    }

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRATION,
      secret: process.env.JWT_SECRET,
    })

    return { accessToken }
  }

  // async getRefreshToken(id: string) {
  //   const payload = {
  //     id,
  //   }
  //   const refreshToken = await this.jwtService.sign(payload, {
  //     expiresIn: process.env.REFRESH_EXPIRATION,
  //     secret: process.env.JWT_SECRET,
  //   })

  //   return { refreshToken }
  // }
}
