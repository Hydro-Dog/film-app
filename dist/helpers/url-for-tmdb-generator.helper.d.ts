import { FilmCategories } from 'src/film/film.models';
export declare const getAPIReqCategoryUrl: (apiBaseUrl: string, apiKey: string, filmCategory: FilmCategories, page: string) => string;
export declare const getAPIDiscoverUrl: (apiBaseUrl: string, apiKey: string, filters: string, page: number, lang: string) => string;
