import { Repository } from 'typeorm';
import { FilmService } from 'src/film/film.service';
import { CreateMatchSessionDTO, SwipeMatchSessionStatusDTO, UpdateMatchSessionStatusDTO } from './match-session.dto';
import { MatchSessionEntity, MatchSessionStatus } from 'src/entity/match-session.entity';
import { UserEntity } from 'src/entity/user.entity';
export declare class MatchSessionService {
    private matchSessionRepository;
    private userRepository;
    private filmService;
    constructor(matchSessionRepository: Repository<MatchSessionEntity>, userRepository: Repository<UserEntity>, filmService: FilmService);
    create(data: CreateMatchSessionDTO): Promise<MatchSessionEntity>;
    deleteMatchSession(matchSessionId: number, userId: number): Promise<number>;
    updateStatus(data: UpdateMatchSessionStatusDTO): Promise<{
        status: MatchSessionStatus;
        id: string;
        created: Date;
        updated: Date;
        category?: string;
        filmsSequence: string[];
        host: UserEntity;
        guest: UserEntity;
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
    getMatchSessionByUserId(id: any): Promise<MatchSessionEntity[]>;
    getMatchSessionById(matchSessionId: any): Promise<MatchSessionEntity>;
    swipe(data: SwipeMatchSessionStatusDTO & {
        user_id: string;
    }): Promise<{
        matched: boolean;
        id: string;
        created: Date;
        updated: Date;
        category?: string;
        filmsSequence: string[];
        host: UserEntity;
        guest: UserEntity;
        filterParams: string;
        matchedMovies?: string[];
        matchLimit: number;
        status: MatchSessionStatus;
        hostCurrentFilmIndex?: number;
        guestCurrentFilmIndex?: number;
        hostLikedFilms?: string[];
        guestLikedFilms?: string[];
        hostLikedFilmIndex: number;
        guestLikedFilmIndex: number;
    }>;
}
