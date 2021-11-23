import { UserService } from './user.service';
import { UserDTO } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<import("./user.dto").UserRO[]>;
    getUser(userId: {
        id: number;
    }): Promise<import("./user.dto").UserRO>;
    updateUser(user: UserDTO): Promise<import("./user.dto").UserRO>;
    checkByUserName(user: {
        userName: string;
        userId: string;
    }, res: any): Promise<any>;
    checkByPhoneNumber(user: {
        phoneNumber: string;
        userId: string;
    }, res: any): Promise<any>;
    getByUserName(userName: Pick<UserDTO, 'userName'>, res: any): Promise<any>;
    getByEmail(email: Pick<UserDTO, 'email'>, res: any): Promise<any>;
    getByPhoneNumber(phoneNumber: Pick<UserDTO, 'phoneNumber'>, res: any): Promise<any>;
}
