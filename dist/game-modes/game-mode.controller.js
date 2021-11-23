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
exports.GameModeController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const game_mode_service_1 = require("./game-mode.service");
let GameModeController = class GameModeController {
    constructor(gameModeService) {
        this.gameModeService = gameModeService;
    }
    getGameModes() {
        return this.gameModeService.getGameModes();
    }
};
__decorate([
    common_1.Get('api/gamemode'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameModeController.prototype, "getGameModes", null);
GameModeController = __decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Controller(),
    __metadata("design:paramtypes", [game_mode_service_1.GameModeService])
], GameModeController);
exports.GameModeController = GameModeController;
//# sourceMappingURL=game-mode.controller.js.map