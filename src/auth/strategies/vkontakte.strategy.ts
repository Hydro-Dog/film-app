import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-vkontakte'
import { Injectable } from '@nestjs/common'
import { User } from 'src/entity/user.entity'

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  constructor() {
    super(
      {
        clientID: process.env.VKONTAKTE_CLIENT_ID,
        clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/vkontakte/redirect',
        scope: ['email', 'profile'],
      },
      function verifyCallback(
        accessToken,
        refreshToken,
        params,
        profile,
        done
      ) {
        const { name, emails, photos } = profile
        const user: Partial<User> = {
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
          emailConfirmed: true,
        }
        done(null, user)
      }
    )
  }
}
