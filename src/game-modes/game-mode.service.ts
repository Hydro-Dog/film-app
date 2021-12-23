import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GameModeEntity } from 'src/entity/game-mode.entity'
import { Repository } from 'typeorm'
import { GameModeDTO } from './game-mode.dto'
import { GameMode } from './game-mode.entity'

@Injectable()
export class GameModeService {
  constructor(
    @InjectRepository(GameModeEntity)
    private gameModesRepository: Repository<GameModeEntity>
  ) {}

  async getGameModes(): Promise<GameModeDTO[]> {
    const gameModes = await this.gameModesRepository.find()
    return gameModes
  }
}
