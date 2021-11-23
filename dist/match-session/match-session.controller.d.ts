import { CreateMatchSessionDTO } from './match-session.dto';
import { MatchSessionService } from './match-session.service';
import { MatchSession } from './match-session.entity';
export declare class MatchSessionController {
    private matchSessionService;
    constructor(matchSessionService: MatchSessionService);
    create(data: CreateMatchSessionDTO): Promise<MatchSession>;
    getMatchSession({ userId, matchSessionId }: {
        userId: any;
        matchSessionId: any;
    }): Promise<MatchSession> | Promise<MatchSession[]>;
    swipeFilm(data: {
        matchSessionId: number;
        filmJSON: string;
        userId: number;
        swipeDirection: 'left' | 'right';
    }): Promise<{
        completed: boolean;
        id: number;
        created: Date;
        region?: string;
        category?: string;
        filmsSequenceJson?: string[];
        host: import("../user/user.entity").User;
        guest: import("../user/user.entity").User;
        lang?: string;
        hostCurrentFilmIndex?: number;
        guestCurrentFilmIndex?: number;
        hostLikedFilms?: string[];
        guestLikedFilms?: string[];
        hostLikedFilmIndex: number;
        guestLikedFilmIndex: number;
        filterParams?: string;
        matchedMoviesJSON?: string[];
        matchLimit: number;
        page: number;
        accepted: boolean;
        declined: boolean;
    } & MatchSession>;
    deleteMatchSession(data: {
        matchSessionId: number;
        userId: number;
    }): Promise<number>;
    update({ id }: {
        id: any;
    }, matchSession: MatchSession): Promise<MatchSession>;
}
