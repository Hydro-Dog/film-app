import { MatchSessionEntity } from 'src/entity/match-session.entity';
import { UserEntity } from 'src/entity/user.entity';
import { MatchSessionService } from 'src/match-session/match-session.service';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    private matchSessionService;
    constructor(userRepository: Repository<UserEntity>, matchSessionService: MatchSessionService);
    getUser(query: Partial<UserEntity>): Promise<UserEntity>;
    updateUser(userData: Partial<UserEntity>): Promise<UserEntity>;
    getUserMatchSession(user_id: string): Promise<MatchSessionEntity[]>;
}
