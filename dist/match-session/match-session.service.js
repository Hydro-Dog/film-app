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
const user_entity_1 = require("../user/user.entity");
const match_session_entity_1 = require("./match-session.entity");
const app_getaway_1 = require("../app-getaway/app-getaway");
const match_session_model_1 = require("./match-session.model");
const film_models_1 = require("../film/film.models");
const INITIAL_PAGES = '1';
const FILMS_PAGE_SIZE = 20;
function matchSessionFactory(hostId, hostUserName, guestId, guestUserName, matchLimit, category, filterParams, filmsSequenceJson) {
    return new match_session_entity_1.MatchSession(new user_entity_1.User({ id: hostId, userName: hostUserName }), new user_entity_1.User({ id: guestId, userName: guestUserName }), 'EN', 0, 0, [], [], null, null, [], matchLimit, 1, false, false, false, filmsSequenceJson, category, filterParams);
}
let MatchSessionService = class MatchSessionService {
    constructor(appGetaway, matchSessionRepository, userRepository, filmService) {
        this.appGetaway = appGetaway;
        this.matchSessionRepository = matchSessionRepository;
        this.userRepository = userRepository;
        this.filmService = filmService;
    }
    async create(data) {
        const filmsSequenceJson = await this.filmService.getFilmsByCategory(INITIAL_PAGES, data.category);
        const host = await this.userRepository.findOne({
            where: { id: data.userId },
        });
        const guest = await this.userRepository.findOne({
            where: { id: data.guestId },
        });
        const matchSessionObj = matchSessionFactory(host.id, host.userName, guest.id, guest.userName, data.matchLimit, data.category, data.filterParams, filmsSequenceJson);
        const matchSession = await this.matchSessionRepository.create(matchSessionObj);
        await this.matchSessionRepository.save(matchSession);
        guest.sessionsInvite = [...guest.sessionsInvite, matchSession.id];
        await this.userRepository.update({ id: host.id }, { ...host });
        await this.userRepository.update({ id: guest.id }, { ...guest });
        this.appGetaway.emitToClient(guest.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
            payload: matchSession,
            event: match_session_model_1.MatchSessionChangesEvents.Add,
        });
        this.appGetaway.emitToClient(host.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
            payload: matchSession,
            event: match_session_model_1.MatchSessionChangesEvents.Add,
        });
        return matchSession;
    }
    async update(id, matchSessionNew) {
        if (matchSessionNew.declined) {
            await this.matchSessionRepository.delete({ id: matchSessionNew.id });
            const guest = await this.userRepository.findOne({
                where: { id: matchSessionNew.guest.id },
            });
            await this.userRepository.update({ id: guest.id }, {
                ...guest,
                sessionsInvite: guest.sessionsInvite.filter((id) => id.toString() !== matchSessionNew.id.toString()),
            });
            this.appGetaway.emitToClient(matchSessionNew.host.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
                payload: matchSessionNew,
                event: match_session_model_1.MatchSessionChangesEvents.ChangeStatus,
            });
            this.appGetaway.emitToClient(matchSessionNew.guest.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
                payload: matchSessionNew,
                event: match_session_model_1.MatchSessionChangesEvents.ChangeStatus,
            });
            return matchSessionNew;
        }
        const matchSessionCurrent = await this.matchSessionRepository.findOne({
            where: { id },
        });
        await this.matchSessionRepository.update({ id }, { ...matchSessionNew });
        if (matchSessionCurrent.accepted === false && matchSessionNew.accepted) {
            const guest = await this.userRepository.findOne({
                where: { id: matchSessionNew.guest.id },
            });
            await this.userRepository.update({ id: guest.id }, {
                ...guest,
                currentMatchSession: matchSessionNew.id,
                sessionsInvite: guest.sessionsInvite.filter((id) => id.toString() !== matchSessionNew.id.toString()),
            });
        }
        const updateMatchSession = await this.matchSessionRepository
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
            .where('match_session.id = :id', { id: matchSessionNew.id })
            .getOne();
        this.appGetaway.emitToClient(matchSessionNew.host.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
            payload: matchSessionNew,
            event: match_session_model_1.MatchSessionChangesEvents.ChangeStatus,
        });
        this.appGetaway.emitToClient(matchSessionNew.guest.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
            payload: matchSessionNew,
            event: match_session_model_1.MatchSessionChangesEvents.ChangeStatus,
        });
        return updateMatchSession;
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
    async swipe(matchSessionId, filmJSON, userId, swipeDirection) {
        const film = JSON.parse(filmJSON);
        const currentMatchSession = await this.matchSessionRepository
            .createQueryBuilder('match_session')
            .select([
            'match_session',
            'guest.id',
            'guest.userName',
            'guest.currentMatchSession',
            'host.id',
            'host.userName',
            'host.currentMatchSession',
        ])
            .leftJoin('match_session.guest', 'guest')
            .leftJoin('match_session.host', 'host')
            .where('match_session.id = :id', { id: matchSessionId })
            .getOne();
        let isMatched = false;
        if (userId === +currentMatchSession.host.id && swipeDirection === 'right') {
            currentMatchSession.hostLikedFilms.push(film.id.toString());
            isMatched = currentMatchSession.guestLikedFilms.includes(film.id.toString());
        }
        else if (userId == +currentMatchSession.guest.id &&
            swipeDirection === 'right') {
            currentMatchSession.guestLikedFilms.push(film.id.toString());
            isMatched = currentMatchSession.hostLikedFilms.includes(film.id.toString());
        }
        if (isMatched) {
            currentMatchSession.matchedMoviesJSON.push(filmJSON);
            const filmIndex = userId === +currentMatchSession.host.id
                ? currentMatchSession.hostCurrentFilmIndex
                : currentMatchSession.guestCurrentFilmIndex;
            if (+currentMatchSession.id ===
                +currentMatchSession.guest.currentMatchSession) {
                this.appGetaway.emitToClient(currentMatchSession.guest.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
                    event: match_session_model_1.MatchSessionChangesEvents.FilmsMatch,
                    payload: {
                        filmJSON: currentMatchSession.filmsSequenceJson[filmIndex],
                        source: userId.toString() === currentMatchSession.guest.id.toString()
                            ? 'self'
                            : 'opponent',
                    },
                });
            }
            if (+currentMatchSession.id ===
                +currentMatchSession.host.currentMatchSession) {
                this.appGetaway.emitToClient(currentMatchSession.host.id.toString(), match_session_model_1.MatchSessionSocketEvents.ServerMessage, {
                    event: match_session_model_1.MatchSessionChangesEvents.FilmsMatch,
                    payload: {
                        filmJSON: currentMatchSession.filmsSequenceJson[filmIndex],
                        source: userId.toString() === currentMatchSession.host.id.toString()
                            ? 'self'
                            : 'opponent',
                    },
                });
            }
        }
        if (userId === +currentMatchSession.host.id) {
            currentMatchSession.hostCurrentFilmIndex++;
        }
        else {
            currentMatchSession.guestCurrentFilmIndex++;
        }
        let completed = currentMatchSession.matchedMoviesJSON.length >=
            currentMatchSession.matchLimit;
        const lastFilmIndex = currentMatchSession.filmsSequenceJson.length - 1;
        if (currentMatchSession.hostCurrentFilmIndex >= lastFilmIndex ||
            currentMatchSession.guestCurrentFilmIndex >= lastFilmIndex) {
            const currentPage = currentMatchSession.filmsSequenceJson.length / FILMS_PAGE_SIZE;
            const filmsSequence = await this.filmService.getFilmsByCategory((currentPage + 1).toString(), currentMatchSession.category);
            currentMatchSession.filmsSequenceJson = [
                ...currentMatchSession.filmsSequenceJson,
                ...filmsSequence.map((filmObj) => JSON.stringify(filmObj)),
            ];
        }
        return await this.matchSessionRepository.save({
            ...currentMatchSession,
            completed,
        });
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
        await this.matchSessionRepository.update({ id: matchSessionId }, { ...matchSession });
        if (!matchSession.host && !matchSession.guest) {
            await this.matchSessionRepository.delete({ id: matchSessionId });
        }
        return matchSessionId;
    }
};
MatchSessionService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(match_session_entity_1.MatchSession)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [app_getaway_1.AppGetaway,
        typeorm_2.Repository,
        typeorm_2.Repository,
        film_service_1.FilmService])
], MatchSessionService);
exports.MatchSessionService = MatchSessionService;
//# sourceMappingURL=match-session.service.js.map