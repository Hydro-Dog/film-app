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
exports.MatchSession = void 0;
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let MatchSession = class MatchSession {
    constructor(host, guest, lang, hostCurrentFilmIndex, guestCurrentFilmIndex, hostLikedFilms, guestLikedFilms, hostLikedFilmIndex, guestLikedFilmIndex, matchedMoviesJSON, matchLimit, page, completed, accepted, declined, filmsSequenceJson, category, filterParams) {
        this.host = host;
        this.guest = guest;
        this.lang = lang;
        this.hostCurrentFilmIndex = hostCurrentFilmIndex;
        this.guestCurrentFilmIndex = guestCurrentFilmIndex;
        this.hostLikedFilms = hostLikedFilms;
        this.guestLikedFilms = guestLikedFilms;
        this.hostLikedFilmIndex = hostLikedFilmIndex;
        this.guestLikedFilmIndex = guestLikedFilmIndex;
        this.matchedMoviesJSON = matchedMoviesJSON;
        this.matchLimit = matchLimit;
        this.page = page;
        this.completed = completed;
        this.accepted = accepted;
        this.declined = declined;
        this.filmsSequenceJson = filmsSequenceJson;
        this.category = category;
        this.filterParams = filterParams;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MatchSession.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], MatchSession.prototype, "created", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], MatchSession.prototype, "region", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], MatchSession.prototype, "category", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], MatchSession.prototype, "filmsSequenceJson", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (user) => user.id),
    __metadata("design:type", user_entity_1.User)
], MatchSession.prototype, "host", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (user) => user.id),
    __metadata("design:type", user_entity_1.User)
], MatchSession.prototype, "guest", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], MatchSession.prototype, "lang", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MatchSession.prototype, "hostCurrentFilmIndex", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MatchSession.prototype, "guestCurrentFilmIndex", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], MatchSession.prototype, "hostLikedFilms", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], MatchSession.prototype, "guestLikedFilms", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", Number)
], MatchSession.prototype, "hostLikedFilmIndex", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", Number)
], MatchSession.prototype, "guestLikedFilmIndex", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], MatchSession.prototype, "filterParams", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], MatchSession.prototype, "matchedMoviesJSON", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MatchSession.prototype, "matchLimit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MatchSession.prototype, "page", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], MatchSession.prototype, "completed", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], MatchSession.prototype, "accepted", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], MatchSession.prototype, "declined", void 0);
MatchSession = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [user_entity_1.User,
        user_entity_1.User, String, Number, Number, Array, Array, Number, Number, Array, Number, Number, Boolean, Boolean, Boolean, Array, String, String])
], MatchSession);
exports.MatchSession = MatchSession;
//# sourceMappingURL=match-session.entity.js.map