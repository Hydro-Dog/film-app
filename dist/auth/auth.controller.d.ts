import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<import("../entity/user.entity").User>;
    vkontakteAuth(req: any): Promise<void>;
    vkontakteAuthRedirect(req: any): Promise<import("../entity/user.entity").User>;
}
