import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/entity/user.entity'
import { MailModule } from 'src/mail/mail.module'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    UserModule,
    MailModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
    // (
    //   {
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '5d' },
    // }
    // ),
  ],
  providers: [
    AuthService,
    // LocalStrategy,
    // JwtStrategy,
    // JwtService,

    // GoogleOauthStrategy,
    // VkontakteStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
