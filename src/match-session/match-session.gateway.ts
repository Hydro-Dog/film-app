import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'

@WebSocketGateway()
export class MatchSessionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: any) {
    console.log('afterInit')
  }
  handleConnection(client: any, ...args: any[]) {}
  handleDisconnect(client: any) {}
}
