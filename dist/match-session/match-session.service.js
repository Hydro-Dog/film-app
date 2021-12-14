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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSessionService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const film_service_1 = require("../film/film.service");
const app_getaway_1 = require("../app-getaway/app-getaway");
const film_models_1 = require("../film/film.models");
const match_session_entity_1 = require("../entity/match-session.entity");
const INITIAL_PAGES = '1';
const FILMS_PAGE_SIZE = 20;
let MatchSessionService = class MatchSessionService {
    constructor(appGetaway, matchSessionRepository, filmService) {
        this.appGetaway = appGetaway;
        this.matchSessionRepository = matchSessionRepository;
        this.filmService = filmService;
    }
    async getMatchSessionByUserId(id) {
        return await this.matchSessionRepository
            .createQueryBuilder('match_session')
            .select([
            'match_session',
            'guest.id',
            'guest.userName',
            'host.id',
            'host.userName',
        ])
            .leftJoin('match_session.guest', 'guest')
            .leftJoin('match_session.host', 'host')
            .where('match_session.guest.id = :id', { id })
            .orWhere('match_session.host.id = :id', { id })
            .getMany();
    }
    async getMatchSessionById(matchSessionId) {
        return await this.matchSessionRepository
            .createQueryBuilder('match_session')
            .select([
            'match_session',
            'guest.id',
            'guest.userName',
            'host.id',
            'host.userName',
        ])
            .leftJoin('match_session.guest', 'guest')
            .leftJoin('match_session.host', 'host')
            .where('match_session.id = :id', { id: matchSessionId })
            .getOne();
    }
    async deleteMatchSession(matchSessionId, userId) {
        var _a, _b;
        const matchSession = await this.matchSessionRepository
            .createQueryBuilder('match_session')
            .select([
            'match_session',
            'guest.id',
            'guest.userName',
            'host.id',
            'host.userName',
        ])
            .leftJoin('match_session.guest', 'guest')
            .leftJoin('match_session.host', 'host')
            .where('match_session.id = :id', { id: matchSessionId })
            .getOne();
        if (+((_a = matchSession === null || matchSession === void 0 ? void 0 : matchSession.guest) === null || _a === void 0 ? void 0 : _a.id) === +userId) {
            matchSession.guest = null;
        }
        else if (+((_b = matchSession === null || matchSession === void 0 ? void 0 : matchSession.host) === null || _b === void 0 ? void 0 : _b.id) === +userId) {
            matchSession.host = null;
        }
        return matchSessionId;
    }
};
MatchSessionService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(match_session_entity_1.MatchSessionEntity)),
    __metadata("design:paramtypes", [app_getaway_1.AppGetaway,
        typeorm_2.Repository,
        film_service_1.FilmService])
], MatchSessionService);
exports.MatchSessionService = MatchSessionService;
//# sourceMappingURL=match-session.service.js.map