import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MatchSessionController } from './match-session.controller'
import { MatchSession } from './match-session.entity'
import { MatchSessionService } from './match-session.service'

@Module({
  imports: [TypeOrmModule.forFeature([MatchSession])],
  controllers: [MatchSessionController],
  providers: [MatchSessionService],
})
export class MatchSessionModule {}
