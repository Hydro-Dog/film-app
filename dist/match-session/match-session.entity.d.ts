import { User } from 'src/user/user.entity';
export declare class MatchSession {
    constructor(host: User, guest: User, lang: string, hostCurrentFilmIndex: number, guestCurrentFilmIndex: number, hostLikedFilms: string[], guestLikedFilms: string[], hostLikedFilmIndex: number, guestLikedFilmIndex: number, matchedMoviesJSON: string[], matchLimit: number, page: number, completed: boolean, accepted: boolean, declined: boolean, filmsSequenceJson: string[], category: string, filterParams: string);
    id: number;
    created: Date;
    region?: string;
    category?: string;
    filmsSequenceJson?: string[];
    host: User;
    guest: User;
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
    completed: boolean;
    accepted: boolean;
    declined: boolean;
}
