import { FilmCategories } from 'src/film/film.models';
export declare class CreateMatchSessionDTO {
    clientId: string;
    guestId: string;
    lang: string;
    hostSequenceCounter?: number;
    guestSequenceCounter?: number;
    hostLikedFilms?: string[];
    guestLikedFilms?: string[];
    matchedFilms?: string[];
    matchLimit: number;
    page?: number;
    filmsIdsSequence?: string[];
    category?: FilmCategories;
    filterParams?: Record<string, unknown>;
    userId?: string;
}
export declare class UpdateMatchSessionDTO {
    userId: string;
    matchSessionId: string;
    filmId: number;
    filmApproved: boolean;
}
