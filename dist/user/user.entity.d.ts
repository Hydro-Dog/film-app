import { UserRO } from './user.dto';
export declare class User {
    constructor(data?: Partial<User>);
    id: string;
    created: Date;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    currentMatchSession: number;
    sessionsInvite: number[];
    createdInvite: string[];
    favoriteFilms: string[];
    sessionHistory: string[];
    emailConfirmed: boolean;
    phoneNumber: string;
    sanitizeUser(hideToken?: boolean): UserRO;
    comparePassword(attempt: string): Promise<boolean>;
}
