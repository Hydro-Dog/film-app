import { CreateUserDTO, LoginUserDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(data: LoginUserDTO): Promise<import("../entity/user.entity").UserEntity>;
    register(data: CreateUserDTO): Promise<import("../entity/user.entity").UserEntity>;
    confirm({ token, userName }: {
        token: any;
        userName: any;
    }): Promise<string>;
    refresh(headers: any, { refreshToken }: {
        refreshToken: any;
    }): Promise<import("../entity/user.entity").UserEntity>;
}
