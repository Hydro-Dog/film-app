import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<string> {
    const now = Date.now()
    const request = context.switchToHttp().getRequest()
    const method = request.method
    const url = request.url

    context.getHandler()

    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${method} ${url} ${Date.now() - now}ms`,
          context.getClass().name
        )
      })
    )
  }
}
