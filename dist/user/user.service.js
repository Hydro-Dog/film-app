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
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async updateUser(id, payload) {
        const user = await this.userRepository.findOne({ where: [{ id }] });
        if (user) {
            await this.userRepository.update(id, {
                ...user,
                ...payload,
            });
            const userUpdated = await this.userRepository.findOne({ where: [{ id }] });
            return userUpdated.sanitizeUser();
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
    }
    async getAll() {
        const users = await this.userRepository.find();
        return users.map((user) => user.sanitizeUser());
    }
    async getUser(id) {
        const user = await this.userRepository.findOne({
            where: [{ id }],
        });
        if (!user) {
            throw new common_1.HttpException('Username not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return user.sanitizeUser();
    }
    async findByUserName(userPayload, res) {
        const { userName } = userPayload;
        const user = await this.userRepository.findOne({
            where: [{ userName }],
        });
        return user
            ? res.status(common_1.HttpStatus.OK).json({ user: user.sanitizeUser() })
            : res.status(common_1.HttpStatus.OK).json({ user: null });
    }
    async findByEmail(payload, res) {
        const { email } = payload;
        const user = await this.userRepository.findOne({
            where: [{ email }],
        });
        if (user) {
            throw new common_1.HttpException('Email is already taken', common_1.HttpStatus.BAD_REQUEST);
        }
        return res.status(common_1.HttpStatus.OK).json({ isAvailable: true });
    }
    async findByPhoneNumber(payload, res) {
        const { phoneNumber } = payload;
        const user = await this.userRepository.findOne({
            where: [{ phoneNumber }],
        });
        if (user) {
            throw new common_1.HttpException('Phone number is already taken', common_1.HttpStatus.BAD_REQUEST);
        }
        return res.status(common_1.HttpStatus.OK).json({ isAvailable: true });
    }
    async checkUserName(userPayload, res) {
        const { userName } = userPayload;
        const user = await this.userRepository.findOne({
            where: [{ userName }],
        });
        if (user && user.id !== userPayload.userId) {
            throw new common_1.HttpException('Username is already taken', common_1.HttpStatus.BAD_REQUEST);
        }
        return res.status(common_1.HttpStatus.OK).json({ isAvailable: true });
    }
    async checkPhoneNumber(userPayload, res) {
        const { phoneNumber } = userPayload;
        const user = await this.userRepository.findOne({
            where: [{ phoneNumber }],
        });
        if (user && user.id !== userPayload.userId) {
            throw new common_1.HttpException('Phone number is already taken', common_1.HttpStatus.BAD_REQUEST);
        }
        return res.status(common_1.HttpStatus.OK).json({ isAvailable: true });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map