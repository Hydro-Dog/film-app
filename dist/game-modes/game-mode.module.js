"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModeModule = void 0;
const game_mode_controller_1 = require("./game-mode.controller");
const game_mode_service_1 = require("./game-mode.service");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const game_mode_entity_1 = require("../entity/game-mode.entity");
let GameModeModule = class GameModeModule {
};
GameModeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([game_mode_entity_1.GameModeEntity]), jwt_1.JwtModule.register({})],
        exports: [typeorm_1.TypeOrmModule, game_mode_service_1.GameModeService],
        controllers: [game_mode_controller_1.GameModeController],
        providers: [game_mode_service_1.GameModeService],
    })
], GameModeModule);
exports.GameModeModule = GameModeModule;
//# sourceMappingURL=game-mode.module.js.map