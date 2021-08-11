import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import * as JWT from 'jsonwebtoken'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const jwt = request?.headers.authorization.split(' ')[1]
    const payload = JWT.decode(jwt) as { id: number }

    console.log('getRequest  request.user: ', request.body)
    return { ...request.body, id: payload.id }
  }
)
