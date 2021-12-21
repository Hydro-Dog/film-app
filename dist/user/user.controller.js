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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const user_entity_1 = require("../entity/user.entity");
const user_id_decorator_1 = require("../shared/user-id.decorator");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getCurrentUser({ user_id }) {
        return this.userService.getUser({ id: user_id });
    }
    updateCurrentUser(user) {
        return this.userService.updateUser(user);
    }
    getUser(query) {
        return this.userService.getUser(query);
    }
    getUserMatchSessions(userData) {
        return this.userService.getUserMatchSession(userData.user_id);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.FilmderAuthGuard),
    common_1.Get('api/currentuserprofile'),
    __param(0, user_id_decorator_1.UserID()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    common_1.UseGuards(auth_guard_1.FilmderAuthGuard),
    common_1.Put('api/currentuserprofile'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateCurrentUser", null);
__decorate([
    common_1.Get('api/user'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Get('api/usermatchsessions'),
    __param(0, user_id_decorator_1.UserID()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserMatchSessions", null);
UserController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map