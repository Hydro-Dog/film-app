export declare class UserDTO {
    created: Date;
    updated: Date;
    id: string;
    password: any;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    accessToken: any;
    refreshToken: string;
    emailConfirmed: boolean;
}
export declare class CreateUserDTO {
    readonly password: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
}
export declare class LoginUserDTO {
    readonly password: string;
    readonly email: string;
}
