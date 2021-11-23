import { Repository } from 'typeorm';
import { GameModeDTO } from './game-mode.dto';
import { GameMode } from './game-mode.entity';
export declare class GameModeService {
    private gameModesRepository;
    constructor(gameModesRepository: Repository<GameMode>);
    getGameModes(): Promise<GameModeDTO[]>;
}
