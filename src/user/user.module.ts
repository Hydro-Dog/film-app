import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt'
import { UserEntity } from 'src/entity/user.entity'
import { MatchSessionEntity } from 'src/entity/match-session.entity'
import { MatchSessionModule } from 'src/match-session/match-session.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchSessionEntity, UserEntity]),
    JwtModule.register({}),
    MatchSessionModule,
  ],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
