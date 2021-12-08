import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
export declare class UserService {
    private userRepository;
    findByUserName(userName: Pick<UserDTO, 'userName'>, res: any): void;
    constructor(userRepository: Repository<User>);
}
