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
export declare class UpdateMatchSessionDTO {
    userId: string;
    matchSessionId: string;
    filmId: number;
    filmApproved: boolean;
}
