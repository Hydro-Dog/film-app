import { CreateMatchSessionDTO, GetMatchSessionDTO, UpdateMatchSessionStatusDTO } from './match-session.dto';
import { MatchSessionService } from './match-session.service';
import { MatchSessionEntity } from 'src/entity/match-session.entity';
export declare class MatchSessionController {
    private matchSessionService;
    constructor(matchSessionService: MatchSessionService);
    getMatchSession(query: GetMatchSessionDTO): Promise<MatchSessionEntity[]> | Promise<MatchSessionEntity>;
    create(data: CreateMatchSessionDTO): Promise<MatchSessionEntity>;
    updateStatus(data: UpdateMatchSessionStatusDTO): Promise<{
        id: string;
        status: import("src/entity/match-session.entity").MatchSessionStatus;
    } & MatchSessionEntity>;
}
