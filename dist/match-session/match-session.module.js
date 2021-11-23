"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSessionModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const app_getaway_1 = require("../app-getaway/app-getaway");
const film_module_1 = require("../film/film.module");
const user_entity_1 = require("../user/user.entity");
const user_module_1 = require("../user/user.module");
const match_session_controller_1 = require("./match-session.controller");
const match_session_entity_1 = require("./match-session.entity");
const match_session_service_1 = require("./match-session.service");
let MatchSessionModule = class MatchSessionModule {
};
MatchSessionModule = __decorate([
    common_1.Module({
        imports: [
            film_module_1.FilmModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([match_session_entity_1.MatchSession, user_entity_1.User]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [match_session_controller_1.MatchSessionController],
        providers: [match_session_service_1.MatchSessionService, app_getaway_1.AppGetaway, common_1.Logger],
    })
], MatchSessionModule);
exports.MatchSessionModule = MatchSessionModule;
//# sourceMappingURL=match-session.module.js.map