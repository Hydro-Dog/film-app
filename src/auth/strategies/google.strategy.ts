import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { config } from 'dotenv'

import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/entity/user.entity'

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/google/redirect',
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails } = profile
    const user: Partial<UserEntity> = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      emailConfirmed: true,
    }
    done(null, user)
  }
}
