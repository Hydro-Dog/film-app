"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const film_controller_1 = require("./film.controller");
const film_service_1 = require("./film.service");
let FilmModule = class FilmModule {
};
FilmModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule, jwt_1.JwtModule.register({})],
        controllers: [film_controller_1.FilmController],
        providers: [film_service_1.FilmService],
        exports: [film_service_1.FilmService],
    })
], FilmModule);
exports.FilmModule = FilmModule;
//# sourceMappingURL=film.module.js.map