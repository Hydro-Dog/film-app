import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmModule } from 'src/film/film.module'
import { User } from 'src/user/user.entity'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { MatchSessionController } from './match-session.controller'
import { MatchSession } from './match-session.entity'
import { MatchSessionService } from './match-session.service'

@Module({
  imports: [
    FilmModule,
    UserModule,
    TypeOrmModule.forFeature([MatchSession, User]),
  ],
  controllers: [MatchSessionController],
  providers: [MatchSessionService],
})
export class MatchSessionModule {}
