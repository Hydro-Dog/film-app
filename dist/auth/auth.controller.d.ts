import { UserDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(data: Pick<UserDTO, 'userName' | 'password'>): Promise<import("src/user/user.dto").UserRO>;
    logout(data: {
        userId: string;
    }): Promise<string>;
    register(data: UserDTO): Promise<{
        id: string;
    }>;
    confirm({ token, userName }: {
        token: any;
        userName: any;
    }): Promise<string>;
    refresh(headers: any, { refreshToken }: {
        refreshToken: any;
    }): Promise<import("src/user/user.dto").UserRO>;
}
