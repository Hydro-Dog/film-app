import { Controller, Get, UseGuards } from '@nestjs/common'
// import { AuthGuard } from 'src/auth/auth.guard'
import { GameModeService } from './game-mode.service'

// @UseGuards(AuthGuard)
@Controller()
export class GameModeController {
  constructor(private gameModeService: GameModeService) {}

  @Get('api/gamemode')
  getGameModes() {
    console.log('========================')
    return this.gameModeService.getGameModes()
  }
}
