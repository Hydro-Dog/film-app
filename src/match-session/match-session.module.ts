import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmModule } from 'src/film/film.module'
import { User } from 'src/user/user.entity'
import { UserModule } from 'src/user/user.module'
import { MatchSessionController } from './match-session.controller'
import { MatchSession } from './match-session.entity'
import { MatchSessionService } from './match-session.service'

@Module({
  imports: [
    FilmModule,
    UserModule,
    TypeOrmModule.forFeature([MatchSession, User]),
    JwtModule.register({}),
  ],
  controllers: [MatchSessionController],
  providers: [MatchSessionService],
})
export class MatchSessionModule {}
