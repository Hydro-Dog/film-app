import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GameModeDTO } from './game-mode.dto'
import { GameMode } from './game-mode.entity'

@Injectable()
export class GameModeService {
  constructor(
    @InjectRepository(GameMode)
    private gameModesRepository: Repository<GameMode>
  ) {
    console.log('heeeeeeeeeere')
  }

  async getGameModes(): Promise<GameModeDTO[]> {
    const gameModes = await this.gameModesRepository.find()
    return gameModes
  }
}
