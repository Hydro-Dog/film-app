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
  wss: Server

  constructor(private logger: Logger) {}

  afterInit(server: Server) {
    this.logger.log('AppGetaway Instantiated', 'AppGetaway')
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected`, 'AppGetaway')
  }

  handleDisconnect(client: Socket) {
    // SOCKET.LEAVE ПОКИДАТЬ И УДАЛЯТЬ КОМНАТУ ПО ДИСКОННЕКТУ КЛИЕНТА
    this.logger.log(`Client ${client.id} disconnected`, 'AppGetaway')
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: 'Hello' }
  }

  @SubscribeMessage('request_user_match_sessions')
  getMatchSessionByUserId(
    @MessageBody() content: { id: number },
    @ConnectedSocket() socket: Socket
  ): WsResponse<any> {
    socket.join(content.id.toString())

    return { event: 'msgToClient', data: 'request_user_match_sessions' }
  }

  @SubscribeMessage('register_listener')
  registerSocketListener(
    @MessageBody() content: { id: number },
    @ConnectedSocket() socket: Socket
  ): WsResponse<any> {
    socket.join(content.id.toString())
    console.log('registerSocketListener', content.id)
    return {
      event: 'listener_registered',
      data: `Listener with id ${content.id} registered`,
    }
  }

  emitToClient(id: any, event: string, message: any) {
    console.log('EMIT TO CLIENT', event, message)
    this.wss.to(id.toString()).emit(event, { message })
  }
}
