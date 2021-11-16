import { Injectable, Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { MatchSessionSocketEvents } from 'src/match-session/match-session.model'

@WebSocketGateway()
export class AppGetaway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server

  constructor(private logger: Logger) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected`, 'AppGetaway')
  }

  handleDisconnect(client: Socket) {
    // SOCKET.LEAVE ПОКИДАТЬ И УДАЛЯТЬ КОМНАТУ ПО ДИСКОННЕКТУ КЛИЕНТА
    this.logger.log(`Client ${client.id} disconnected`, 'AppGetaway')
  }

  @SubscribeMessage(MatchSessionSocketEvents.RegisterNewListener)
  registerSocketListener(
    @MessageBody() content: { id: number },
    @ConnectedSocket() socket: Socket
  ): WsResponse<any> {
    socket.join(content.id.toString())
    return {
      event: MatchSessionSocketEvents.RegisterNewListener,
      data: `Listener with id ${content.id} registered`,
    }
  }

  emitToClient(id: any, event: string, message: any) {
    this.wss.to(id.toString()).emit(event, { message })
  }
}
