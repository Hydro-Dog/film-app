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
const match_session_entity_1 = require("../entity/match-session.entity");
const user_entity_1 = require("../entity/user.entity");
const film_dto_1 = require("../film/film.dto");
const INITIAL_PAGES = '1';
const FILMS_PAGE_SIZE = 20;
let MatchSessionService = class MatchSessionService {
    constructor(matchSessionRepository, userRepository, filmService) {
        this.matchSessionRepository = matchSessionRepository;
        this.userRepository = userRepository;
        this.filmService = filmService;
    }
    async create(data) {
        const filmsSequence = await this.filmService.getFilmsByCategory(INITIAL_PAGES, data.category);
        const host = await this.userRepository.findOne({
            where: { id: data.hostId },
        });
        const guest = await this.userRepository.findOne({
            where: { id: data.guestId },
        });
        const matchSessionData = await this.matchSessionRepository.create(new match_session_entity_1.MatchSessionEntity({
            host: new user_entity_1.UserEntity(host),
            guest: new user_entity_1.UserEntity(guest),
            filmsSequence,
            category: data.category,
            matchLimit: data.matchLimit,
            status: match_session_entity_1.MatchSessionStatus.Pending,
        }));
        const matchSessionSaved = await this.matchSessionRepository.save(matchSessionData);
        guest.invitedToMatchesUUIDs = [
            ...guest.invitedToMatchesUUIDs,
            matchSessionSaved.id,
        ];
        host.hostedMatchesUUIDs = [...host.hostedMatchesUUIDs, matchSessionSaved.id];
        await this.userRepository.update({ id: host.id }, { ...host });
        await this.userRepository.update({ id: guest.id }, { ...guest });
        return matchSessionData;
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
    async updateStatus(data) {
        if (data.status === match_session_entity_1.MatchSessionStatus.Declined) {
            const deletedMatch = await this.matchSessionRepository.findOne({
                id: data.matchSessionId,
            });
            await this.matchSessionRepository.delete({
                id: data.matchSessionId,
            });
            return { ...deletedMatch, status: match_session_entity_1.MatchSessionStatus.Declined };
        }
        return await this.matchSessionRepository.save({
            id: data.matchSessionId,
            status: data.status,
        });
    }
    async getMatchSessionByUserId(id) {
        return await this.matchSessionRepository
            .createQueryBuilder('match_session')
            .select([
            'match_session',
            'guest.id',
            'guest.username',
            'host.id',
            'host.username',
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
    async swipe(data) {
        const film = JSON.parse(data.film);
        const matchSession = await this.getMatchSessionById(data.matchSessionId);
        const userRole = data.user_id === matchSession.host.id ? 'host' : 'guest';
        const opponentRole = data.user_id === matchSession.host.id ? 'guest' : 'host';
        matchSession[userRole + 'LikedFilms'].push(film.id);
        matchSession[userRole + 'CurrentFilmIndex']++;
        let matched = false;
        if (data.swipe === 'right') {
            matchSession[opponentRole + 'LikedFilms'].includes(film.id);
            matchSession.matchedMovies.push(data.film);
            matched = true;
        }
        matchSession.status =
            matchSession.matchedMovies.length >= matchSession.matchLimit
                ? match_session_entity_1.MatchSessionStatus.Completed
                : matchSession.status;
        return { ...matchSession, matched };
    }
};
MatchSessionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(match_session_entity_1.MatchSessionEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        film_service_1.FilmService])
], MatchSessionService);
exports.MatchSessionService = MatchSessionService;
//# sourceMappingURL=match-session.service.js.map