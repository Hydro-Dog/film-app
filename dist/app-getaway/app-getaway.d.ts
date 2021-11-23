import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class AppGetaway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    wss: Server;
    constructor(logger: Logger);
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    registerSocketListener(content: {
        id: number;
    }, socket: Socket): WsResponse<any>;
    emitToClient(id: any, event: string, message: any): void;
}
