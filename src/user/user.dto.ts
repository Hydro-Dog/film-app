import { IsNotEmpty } from 'class-validator'

export class UserDTO {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  userName: string

  @IsNotEmpty()
  phoneNumber: string
}

export class UserRO {
  id: string
  created: Date
  email: string
  firstName: string
  lastName: string
  userName: string
  accessToken?: string
  refreshToken?: string
  phoneNumber: string
}
