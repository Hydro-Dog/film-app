import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import * as JWT from 'jsonwebtoken'

export const UserID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (request?.headers.authorization) {
      const jwt = request?.headers.authorization.split(' ')[1]
      const payload = JWT.decode(jwt) as { id: number }

      return { ...request.body, user_id: payload.id }
    }
    return { ...request.body }
  }
)
