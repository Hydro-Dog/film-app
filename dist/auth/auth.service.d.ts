import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO, LoginUserDTO } from 'src/user/user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/entity/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private mailerService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService, mailerService: MailerService);
    validateUser(username: string, pass: string): Promise<any>;
    register(userData: CreateUserDTO): Promise<UserEntity>;
    login(userData: LoginUserDTO): Promise<UserEntity>;
    checkForExistence(key: string, value: any): Promise<UserEntity>;
    hashUserPassword(userData: CreateUserDTO): Promise<CreateUserDTO>;
    sendUserConfirmation(user: CreateUserDTO): Promise<any>;
    createUser(userData: CreateUserDTO): Promise<UserEntity>;
    confirmUser(token: string, username: string): Promise<string>;
}
