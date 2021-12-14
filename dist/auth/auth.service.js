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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_dto_1 = require("../user/user.dto");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const user_entity_1 = require("../entity/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, mailerService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateUser(username, pass) {
        console.log('username: ', username);
        const user = await this.userRepository.findOne({ where: { username } });
        console.log('user: ', user);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async register(userData) {
        const emailExists = await this.checkForExistence('email', userData.email);
        const usernameExists = await this.checkForExistence('username', userData.username);
        if (emailExists || usernameExists) {
            throw new common_1.HttpException('User with such email or user name number already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return await this.createUser(userData);
        }
    }
    async login(userData) {
        const user = await this.userRepository.findOne({
            where: { email: userData.email },
        });
        if (!user) {
            throw new common_1.HttpException('No such user', common_1.HttpStatus.BAD_REQUEST);
        }
        const accessToken = await this.jwtService.sign({ id: user.id }, {
            expiresIn: process.env.ACCESS_EXPIRATION,
            secret: process.env.JWT_SECRET,
        });
        const refreshToken = await this.jwtService.sign({ id: user.id }, {
            expiresIn: process.env.REFRESH_EXPIRATION,
            secret: process.env.JWT_SECRET,
        });
        const userUpdated = await this.userRepository.save({
            ...user,
            accessToken,
            refreshToken,
        });
        return new user_entity_1.UserEntity(userUpdated);
    }
    async checkForExistence(key, value) {
        return await this.userRepository.findOne({
            where: { [key]: value },
        });
    }
    async hashUserPassword(userData) {
        let password = await bcrypt.hash(userData.password + process.env.SAULT, 10);
        return { ...userData, password };
    }
    async sendUserConfirmation(user) {
        const token = await bcrypt.hash(user.username + process.env.CONFIRMATION_SECRET, 10);
        try {
            return await this.mailerService.sendMail({
                to: user.email,
                subject: 'Welcome to Filmder! Please, confirm your Email',
                template: './registration-confirmation',
                context: {
                    name: user.firstName,
                    username: user.username,
                    token,
                },
            });
        }
        catch (error) {
            console.error('ERROR: ', error);
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createUser(userData) {
        try {
            const hashedUser = await this.hashUserPassword(userData);
            const user = await this.userRepository.create(hashedUser);
            await this.userRepository.save(user);
            const mailerResponse = await this.sendUserConfirmation(user);
            return new user_entity_1.UserEntity({ user, ...mailerResponse });
        }
        catch (error) {
            console.error('ERROR: ', error);
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async confirmUser(token, username) {
        const isValid = await bcrypt.compare(username + process.env.CONFIRMATION_SECRET, token);
        if (isValid) {
            const user = await this.userRepository.findOne({ where: { username } });
            user.emailConfirmed = true;
            this.userRepository.save(user);
            return 'Account confirmed';
        }
        else {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map