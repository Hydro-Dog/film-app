import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class MatchSessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    afterInit(server: any): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
}
