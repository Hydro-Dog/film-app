"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const film_module_1 = require("./film/film.module");
const match_session_module_1 = require("./match-session/match-session.module");
const http_error_filter_1 = require("./shared/http-error.filter");
const logger_interceptor_1 = require("./shared/logger.interceptor");
const timeout_interceptor_1 = require("./shared/timeout.interceptor");
const user_module_1 = require("./user/user.module");
const mail_module_1 = require("./mail/mail.module");
const game_mode_module_1 = require("./game-modes/game-mode.module");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_URL = process.env.DB_URL;
const ENVIRONMENT = process.env.ENVIRONMENT;
const dev = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: true,
    entities: [
        path_1.join(__dirname, '**', '*.entity.{ts,js}'),
        path_1.join(path_1.basename(path_1.dirname(__filename)), '**', '*.entity.{ts,js}'),
    ],
    synchronize: true,
    autoLoadEntities: true,
};
const prod = {
    type: 'postgres',
    url: DB_URL,
    logging: true,
    entities: [
        path_1.join(__dirname, '**', '*.entity.{ts,js}'),
        path_1.join(path_1.basename(path_1.dirname(__filename)), '**', '*.entity.{ts,js}'),
    ],
    synchronize: false,
    autoLoadEntities: false,
    migrations: ['src/migration/**/*.js'],
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            getTypeOrmConfig(),
            user_module_1.UserModule,
            match_session_module_1.MatchSessionModule,
            film_module_1.FilmModule,
            game_mode_module_1.GameModeModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            common_1.Logger,
            {
                provide: core_1.APP_FILTER,
                useClass: http_error_filter_1.HttpErrorFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logger_interceptor_1.LoggerInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: timeout_interceptor_1.TimeoutInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
function getTypeOrmConfig() {
    return typeorm_1.TypeOrmModule.forRoot((ENVIRONMENT === 'dev' ? dev : prod));
}
//# sourceMappingURL=app.module.js.map