import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    updateUser(id: number, payload: Partial<UserDTO>): Promise<UserRO>;
    getAll(): Promise<UserRO[]>;
    getUser(id: number): Promise<UserRO>;
    findByUserName(userPayload: Partial<UserDTO>, res: any): Promise<any>;
    findByEmail(payload: Pick<UserDTO, 'email'>, res: any): Promise<any>;
    findByPhoneNumber(payload: Pick<UserDTO, 'phoneNumber'>, res: any): Promise<any>;
    checkUserName(userPayload: {
        userName: string;
        userId: string;
    }, res: any): Promise<any>;
    checkPhoneNumber(userPayload: {
        phoneNumber: string;
        userId: string;
    }, res: any): Promise<any>;
}
