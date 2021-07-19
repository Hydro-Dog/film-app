import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { User } from './user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthModule } from 'src/auth/auth.module'
import { AuthService } from 'src/auth/auth.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
