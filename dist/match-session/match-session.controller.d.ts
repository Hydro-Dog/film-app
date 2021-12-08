import { MatchSessionService } from './match-session.service';
import { MatchSession } from 'src/entity/match-session.entity';
export declare class MatchSessionController {
    private matchSessionService;
    constructor(matchSessionService: MatchSessionService);
    getMatchSession({ userId, matchSessionId }: {
        userId: any;
        matchSessionId: any;
    }): Promise<MatchSession[]> | Promise<MatchSession>;
    deleteMatchSession(data: {
        matchSessionId: number;
        userId: number;
    }): Promise<number>;
}
