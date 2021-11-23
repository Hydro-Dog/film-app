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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const match_session_entity_1 = require("../match-session/match-session.entity");
let User = class User {
    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
    }
    sanitizeUser(hideToken = true) {
        const { id, created, firstName, lastName, email, userName, accessToken, phoneNumber, currentMatchSession, } = this;
        const responseObject = {
            id,
            created,
            firstName,
            lastName,
            email,
            userName,
            accessToken,
            phoneNumber,
            currentMatchSession,
        };
        return responseObject;
    }
    async comparePassword(attempt) {
        return await bcrypt.compare(attempt, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "created", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "currentMatchSession", void 0);
__decorate([
    typeorm_1.OneToMany((type) => match_session_entity_1.MatchSession, (matchSession) => matchSession.guest),
    typeorm_1.Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "sessionsInvite", void 0);
__decorate([
    typeorm_1.OneToMany((type) => match_session_entity_1.MatchSession, (matchSession) => matchSession.host),
    typeorm_1.Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "createdInvite", void 0);
__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "favoriteFilms", void 0);
__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "sessionHistory", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "emailConfirmed", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
User = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map