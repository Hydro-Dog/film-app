import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/user.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private mailerService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, mailerService: MailerService);
    confirmUser(token: string, userName: string): Promise<string>;
    refresh(headers: any, refresh: string): Promise<import("src/user/user.dto").UserRO>;
    login(data: Pick<UserDTO, 'userName' | 'password'>): Promise<import("src/user/user.dto").UserRO>;
    logout(userId: string): Promise<string>;
    register(data: UserDTO): Promise<{
        id: string;
    }>;
    sendUserConfirmation(user: User, token: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
    getAccessToken(id: string): Promise<{
        accessToken: string;
    }>;
    getRefreshToken(id: string): Promise<{
        refreshToken: string;
    }>;
}
