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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const match_session_entity_1 = require("../entity/match-session.entity");
const user_entity_1 = require("../entity/user.entity");
const match_session_dto_1 = require("../match-session/match-session.dto");
const match_session_service_1 = require("../match-session/match-session.service");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, matchSessionService) {
        this.userRepository = userRepository;
        this.matchSessionService = matchSessionService;
    }
    async getUser(query) {
        let user;
        if (query === null || query === void 0 ? void 0 : query.email) {
            user = await this.userRepository.findOne({
                where: [{ email: query.email }],
            });
        }
        else if (query === null || query === void 0 ? void 0 : query.username) {
            user = await this.userRepository.findOne({
                where: [{ username: query.username }],
            });
        }
        else if (query === null || query === void 0 ? void 0 : query.id) {
            user = await this.userRepository.findOne({
                where: [{ id: query.id }],
            });
        }
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async updateUser(userData) {
        const user = await this.userRepository.findOne({
            where: [{ id: userData.id }],
        });
        if (user) {
            await this.userRepository.update(userData.id, {
                ...user,
                ...userData,
            });
            const userUpdated = await this.userRepository.findOne({
                where: [{ id: userData.id }],
            });
            return new user_entity_1.UserEntity(userUpdated);
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
    }
    async getUserMatchSession(user_id) {
        const matchSession = this.matchSessionService.getMatchSessionByUserId(user_id);
        if (matchSession) {
            return matchSession;
        }
        else {
            throw new common_1.HttpException('No match sessions for user', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        match_session_service_1.MatchSessionService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map