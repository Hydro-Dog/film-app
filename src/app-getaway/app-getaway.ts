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

  //Передавать в качесвте айдишника айдишник юзера из базы
  //Создавать room с таким айдишником и добавлять в него этого клиента

  handleDisconnect(client: Socket) {
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
    //добавить комнату с id, полученным в аргументах
    //добавить в эту комнату этого клиента
    socket.join(content.id.toString())

    return { event: 'msgToClient', data: 'request_user_match_sessions' }
  }
}

// emitToUser(id, event, message) {}
