import { IsNotEmpty, IsOptional } from 'class-validator'

export class UserDTO {
  @IsOptional()
  created: Date

  @IsOptional()
  updated: Date

  @IsOptional()
  id: string

  @IsOptional()
  password

  @IsOptional()
  email: string

  @IsOptional()
  firstName: string

  @IsOptional()
  lastName: string

  @IsNotEmpty()
  userName: string

  @IsOptional()
  accessToken

  @IsOptional()
  refreshToken: string

  @IsOptional()
  emailConfirmed: boolean
}

export class CreateUserDTO {
  readonly password: string
  readonly email: string
  readonly firstName: string
  readonly lastName: string
  readonly username: string
}

export class LoginUserDTO {
  readonly password: string
  readonly email: string
}

// export class UserRO {
//   id: string
//   created: Date
//   email: string
//   firstName: string
//   lastName: string
//   userName: string
//   accessToken?: string
//   refreshToken?: string
//   phoneNumber: string
//   currentMatchSession: number
// }
