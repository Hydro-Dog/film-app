import { Repository } from 'typeorm';
import { FilmService } from 'src/film/film.service';
import { CreateMatchSessionDTO, UpdateMatchSessionStatusDTO } from './match-session.dto';
import { MatchSessionEntity, MatchSessionStatus } from 'src/entity/match-session.entity';
import { UserEntity } from 'src/entity/user.entity';
export declare class MatchSessionService {
    private matchSessionRepository;
    private userRepository;
    private filmService;
    constructor(matchSessionRepository: Repository<MatchSessionEntity>, userRepository: Repository<UserEntity>, filmService: FilmService);
    create(data: CreateMatchSessionDTO): Promise<MatchSessionEntity>;
    deleteMatchSession(matchSessionId: number, userId: number): Promise<number>;
    updateStatus(data: UpdateMatchSessionStatusDTO): Promise<{
        id: string;
        status: MatchSessionStatus;
    } & MatchSessionEntity>;
    decline(): void;
    continue(): void;
    leave(): void;
    getMatchSessionByUserId(id: any): Promise<MatchSessionEntity[]>;
    getMatchSessionById(matchSessionId: any): Promise<MatchSessionEntity>;
}
