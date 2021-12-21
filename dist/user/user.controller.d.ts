import { UserEntity } from 'src/entity/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getCurrentUser({ user_id }: {
        user_id: any;
    }): Promise<UserEntity>;
    updateCurrentUser(user: UserEntity): Promise<UserEntity>;
    getUser(query: Partial<UserEntity>): Promise<UserEntity>;
    getUserMatchSessions(userData: {
        user_id: string;
    }): Promise<import("../entity/match-session.entity").MatchSessionEntity[]>;
}
