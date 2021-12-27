import { MatchSessionStatus } from 'src/entity/match-session.entity';
import { FilmCategories } from 'src/film/film.models';
export declare class GetMatchSessionDTO {
    matchSessionId?: string;
    userId?: string;
}
export declare class CreateMatchSessionDTO {
    hostId: string;
    guestId: string;
    matchLimit: number;
    category: FilmCategories;
}
export declare class UpdateMatchSessionStatusDTO {
    matchSessionId: string;
    status: MatchSessionStatus;
}
export declare class SwipeMatchSessionStatusDTO {
    matchSessionId: string;
    swipe: 'left' | 'right';
    film: string;
}
