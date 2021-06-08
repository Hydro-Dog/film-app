import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { User } from './user.entity'
import { UserController } from './user.controller'
import { UserServide } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserServide],
})
export class UserModule {}
