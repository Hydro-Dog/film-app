import { HttpService } from '@nestjs/common';
import { FilmCategories } from './film.models';
export declare class FilmService {
    private httpService;
    constructor(httpService: HttpService);
    getAvailableRegions(): Promise<any>;
    getFilmsByCategory(pageNumber: string, filmCategory: FilmCategories): Promise<string[]>;
    getFilmsByFilters(pageNumbers: string, filterParams: Record<string, unknown>): Promise<any[]>;
}
