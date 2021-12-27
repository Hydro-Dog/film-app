import { CreateMatchSessionDTO, GetMatchSessionDTO, SwipeMatchSessionStatusDTO, UpdateMatchSessionStatusDTO } from './match-session.dto';
import { MatchSessionService } from './match-session.service';
import { MatchSessionEntity } from 'src/entity/match-session.entity';
export declare class MatchSessionController {
    private matchSessionService;
    constructor(matchSessionService: MatchSessionService);
    getMatchSession(query: GetMatchSessionDTO): Promise<MatchSessionEntity[]> | Promise<MatchSessionEntity>;
    create(data: CreateMatchSessionDTO): Promise<MatchSessionEntity>;
    updateStatus(data: UpdateMatchSessionStatusDTO): Promise<{
        status: import("src/entity/match-session.entity").MatchSessionStatus;
        id: string;
        created: Date;
        updated: Date;
        category?: string;
        filmsSequence: string[];
        host: import("../entity/user.entity").UserEntity;
        guest: import("../entity/user.entity").UserEntity;
        filterParams: string;
        matchedMovies?: string[];
        matchLimit: number;
        hostCurrentFilmIndex?: number;
        guestCurrentFilmIndex?: number;
        hostLikedFilms?: string[];
        guestLikedFilms?: string[];
        hostLikedFilmIndex: number;
        guestLikedFilmIndex: number;
    }>;
    swipe(data: SwipeMatchSessionStatusDTO & {
        user_id: string;
    }): Promise<{
        matched: boolean;
        id: string;
        created: Date;
        updated: Date;
        category?: string;
        filmsSequence: string[];
        host: import("../entity/user.entity").UserEntity;
        guest: import("../entity/user.entity").UserEntity;
        filterParams: string;
        matchedMovies?: string[];
        matchLimit: number;
        status: import("src/entity/match-session.entity").MatchSessionStatus;
        hostCurrentFilmIndex?: number;
        guestCurrentFilmIndex?: number;
        hostLikedFilms?: string[];
        guestLikedFilms?: string[];
        hostLikedFilmIndex: number;
        guestLikedFilmIndex: number;
    }>;
}
