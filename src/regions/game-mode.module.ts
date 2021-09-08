import { GameModeController } from './game-mode.controller'
import { GameMode } from './game-mode.entity'
import { GameModeService } from './game-mode.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([GameMode]), JwtModule.register({})],
  exports: [TypeOrmModule, GameModeService],
  controllers: [GameModeController],
  providers: [GameModeService],
})
export class GameModeModule {}
