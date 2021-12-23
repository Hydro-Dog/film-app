import { GameModeEntity } from 'src/entity/game-mode.entity';
import { Repository } from 'typeorm';
import { GameModeDTO } from './game-mode.dto';
export declare class GameModeService {
    private gameModesRepository;
    constructor(gameModesRepository: Repository<GameModeEntity>);
    getGameModes(): Promise<GameModeDTO[]>;
}
