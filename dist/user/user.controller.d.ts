import { UserEntity } from 'src/entity/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(req: any): any;
    getUser(query: Partial<UserEntity>): Promise<UserEntity>;
    getCurrentUser({ user_id }: {
        user_id: any;
    }): Promise<UserEntity>;
}
