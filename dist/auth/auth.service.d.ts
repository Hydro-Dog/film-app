import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    googleLogin(userPayload: Partial<User>): Promise<User>;
    vkontakteLogin(userPayload: Partial<User>): Promise<User>;
    createOrFind(userPayload: Partial<User>): Promise<User>;
    checkIfUserEmailExists(userPayload: Partial<User>): Promise<User>;
    createUser(userPayload: Partial<User>): Promise<User>;
}
