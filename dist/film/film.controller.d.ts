import { FilmService } from './film.service';
export declare class FilmController {
    private filmService;
    constructor(filmService: FilmService);
    getAvailableRegions(): Promise<any>;
}
