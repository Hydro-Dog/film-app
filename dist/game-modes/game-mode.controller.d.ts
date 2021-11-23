import { GameModeService } from './game-mode.service';
export declare class GameModeController {
    private gameModeService;
    constructor(gameModeService: GameModeService);
    getGameModes(): Promise<import("./game-mode.dto").GameModeDTO[]>;
}
