import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { User } from './user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MatchSession } from 'src/match-session/match-session.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
