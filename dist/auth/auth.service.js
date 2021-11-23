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
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_dto_1 = require("../user/user.dto");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, mailerService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async confirmUser(token, userName) {
        const isValid = await bcrypt.compare(userName + process.env.CONFIRMATION_SECRET, token);
        if (isValid) {
            const user = await this.userRepository.findOne({ where: { userName } });
            user.emailConfirmed = true;
            this.userRepository.save(user);
            return 'Account confirmed';
        }
        else {
            throw new common_1.HttpException('Error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async refresh(headers, refresh) {
        try {
            this.jwtService.verify(refresh, { secret: process.env.JWT_SECRET });
        }
        catch (error) {
            throw new common_1.HttpException('Refresh expired', common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = this.jwtService.decode(headers.authorization.split(' ')[1]);
        const user = await this.userRepository.findOne({
            where: { id: payload.id },
        });
        const { accessToken } = await this.getAccessToken(user.id);
        user.accessToken = accessToken;
        await this.userRepository.update(user.id, user);
        const responseUser = user.sanitizeUser();
        return responseUser;
    }
    async login(data) {
        const { userName, password } = data;
        const user = await this.userRepository.findOne({ where: { userName } });
        if (!user || !(await user.comparePassword(password))) {
            throw new common_1.HttpException('Invalid username/password', common_1.HttpStatus.BAD_REQUEST);
        }
        const [{ accessToken }, { refreshToken }] = await Promise.all([
            this.getAccessToken(user.id),
            this.getRefreshToken(user.id),
        ]);
        await this.userRepository.update(user.id, user);
        const responseUser = user.sanitizeUser();
        responseUser.refreshToken = refreshToken;
        responseUser.accessToken = accessToken;
        return responseUser;
    }
    async logout(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.HttpException('Who the duck are you looking for?', common_1.HttpStatus.BAD_REQUEST);
        }
        const loggedOutUser = {
            ...user,
            accessToken: null,
            refreshToken: null,
        };
        await this.userRepository.update(user.id, loggedOutUser);
        return userId;
    }
    async register(data) {
        const { email, userName } = data;
        console.log('email: ', email, userName);
        let user = await this.userRepository.findOne({
            where: [{ email }, { userName }],
        });
        console.log('user: ', user);
        if (user) {
            throw new common_1.HttpException('User with such email or user name number already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        console.log('user2: ', user);
        user.password = await this.hashPassword(data.password);
        user.sessionsInvite = [];
        user.currentMatchSession = null;
        user.emailConfirmed = false;
        const token = await bcrypt.hash(user.userName + process.env.CONFIRMATION_SECRET, 10);
        console.log('HERE');
        try {
            await this.sendUserConfirmation(user, token);
        }
        catch (e) {
            console.log('error: ', e);
        }
        console.log('THERE');
        await this.userRepository.save(user);
        return { id: user.id };
    }
    async sendUserConfirmation(user, token) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './registration-confirmation',
            context: {
                name: user.firstName,
                userName: user.userName,
                token,
            },
        });
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async getAccessToken(id) {
        const payload = {
            id,
        };
        const accessToken = await this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_EXPIRATION,
            secret: process.env.JWT_SECRET,
        });
        return { accessToken };
    }
    async getRefreshToken(id) {
        const payload = {
            id,
        };
        const refreshToken = await this.jwtService.sign(payload, {
            expiresIn: process.env.REFRESH_EXPIRATION,
            secret: process.env.JWT_SECRET,
        });
        return { refreshToken };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map