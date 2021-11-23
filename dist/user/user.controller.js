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
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const auth_guard_1 = require("../auth/auth.guard");
const user_id_decorator_1 = require("../shared/user-id.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAll() {
        return this.userService.getAll();
    }
    getUser(userId) {
        return this.userService.getUser(userId.id);
    }
    updateUser(user) {
        return this.userService.updateUser(user.id, user);
    }
    checkByUserName(user, res) {
        return this.userService.checkUserName(user, res);
    }
    checkByPhoneNumber(user, res) {
        return this.userService.checkPhoneNumber(user, res);
    }
    getByUserName(userName, res) {
        return this.userService.findByUserName(userName, res);
    }
    getByEmail(email, res) {
        return this.userService.findByEmail(email, res);
    }
    getByPhoneNumber(phoneNumber, res) {
        return this.userService.findByPhoneNumber(phoneNumber, res);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('api/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    common_1.Get('api/users/userId'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Put('api/users'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('api/users/checkUserName'),
    __param(0, user_id_decorator_1.User()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkByUserName", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('api/users/checkPhoneNumber'),
    __param(0, user_id_decorator_1.User()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkByPhoneNumber", null);
__decorate([
    common_1.Get('api/users/username'),
    __param(0, common_1.Query()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getByUserName", null);
__decorate([
    common_1.Get('api/users/email'),
    __param(0, common_1.Query()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getByEmail", null);
__decorate([
    common_1.Get('api/users/phoneNumber'),
    __param(0, common_1.Query()),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getByPhoneNumber", null);
UserController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map