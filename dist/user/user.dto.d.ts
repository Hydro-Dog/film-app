export declare class UserDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: string;
    id: any;
    clientId: any;
}
export declare class UserRO {
    id: string;
    created: Date;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    accessToken?: string;
    refreshToken?: string;
    phoneNumber: string;
    currentMatchSession: number;
}
