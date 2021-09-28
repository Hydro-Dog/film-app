import { Injectable, Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class AppGetaway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss

  constructor(private logger: Logger) {}

  afterInit(server: Server) {
    this.logger.log('AppGetaway Instantiated', 'AppGetaway')
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected`, 'AppGetaway')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`, 'AppGetaway')
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    console.log('handleMessage: ', text)
    return { event: 'msgToClient', data: 'Hello' }
  }
}
