import { Repository } from 'typeorm';
import { FilmService } from 'src/film/film.service';
import { AppGetaway } from 'src/app-getaway/app-getaway';
import { MatchSessionEntity } from 'src/entity/match-session.entity';
export declare class MatchSessionService {
    private appGetaway;
    private matchSessionRepository;
    private filmService;
    constructor(appGetaway: AppGetaway, matchSessionRepository: Repository<MatchSessionEntity>, filmService: FilmService);
    getMatchSessionByUserId(id: any): Promise<MatchSessionEntity[]>;
    getMatchSessionById(matchSessionId: any): Promise<MatchSessionEntity>;
    deleteMatchSession(matchSessionId: number, userId: number): Promise<number>;
}
