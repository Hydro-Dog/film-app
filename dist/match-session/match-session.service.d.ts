import { Repository } from 'typeorm';
import { FilmService } from 'src/film/film.service';
import { AppGetaway } from 'src/app-getaway/app-getaway';
import { MatchSession } from 'src/entity/match-session.entity';
export declare class MatchSessionService {
    private appGetaway;
    private matchSessionRepository;
    private filmService;
    constructor(appGetaway: AppGetaway, matchSessionRepository: Repository<MatchSession>, filmService: FilmService);
    getMatchSessionByUserId(id: any): Promise<MatchSession[]>;
    getMatchSessionById(matchSessionId: any): Promise<MatchSession>;
    deleteMatchSession(matchSessionId: number, userId: number): Promise<number>;
}
