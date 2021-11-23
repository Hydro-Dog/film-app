"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmService = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const object_to_query_string_helper_1 = require("../helpers/object-to-query-string.helper");
const url_for_tmdb_generator_helper_1 = require("../helpers/url-for-tmdb-generator.helper");
const lodash_1 = require("lodash");
const category = 'discover/movie';
const pageNumber = 1;
const filter = '&with_genres=28';
const apiKey = 'ec184becc0a551d20978c49859863834';
const language = 'ru-RU';
const apiReqUrl = `${process.env.API_BASE_URL}/${category}?page=${pageNumber}${filter}&api_key=${apiKey}&language=${language}`;
let FilmService = class FilmService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getAvailableRegions() {
        return this.httpService
            .get(`${process.env.API_BASE_URL}/watch/providers/regions?api_key=${process.env.API_KEY}`)
            .pipe(operators_1.map((x) => x.data.results))
            .toPromise();
    }
    async getFilmsByCategory(pageNumber, filmCategory) {
        const films = await this.httpService
            .get(url_for_tmdb_generator_helper_1.getAPIReqCategoryUrl(process.env.API_BASE_URL, process.env.API_KEY, filmCategory, pageNumber))
            .toPromise();
        console.log('films.data: ', films.data);
        if (!films.data.results) {
            throw new common_1.HttpException('Error from API', common_1.HttpStatus.I_AM_A_TEAPOT);
        }
        return lodash_1.shuffle(films.data.results);
    }
    async getFilmsByFilters(pageNumbers, filterParams) {
        const pageNumbersArr = pageNumbers.split(',');
        const requestsArr = pageNumbersArr.map((page) => {
            return this.httpService
                .get(url_for_tmdb_generator_helper_1.getAPIDiscoverUrl(process.env.API_BASE_URL, process.env.API_KEY, object_to_query_string_helper_1.objectToQueryString(filterParams), page, 'ru-RU'))
                .toPromise();
        });
        const allRequests = await Promise.all(requestsArr);
        return allRequests.flatMap((x) => x.data.results.map((movie) => movie.id));
    }
};
FilmService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], FilmService);
exports.FilmService = FilmService;
//# sourceMappingURL=film.service.js.map