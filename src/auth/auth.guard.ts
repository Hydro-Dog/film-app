import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable, of } from 'rxjs'

@Injectable()
export class FilmderAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const bearer = request.headers.authorization.split(' ')[1]
    try {
      this.jwtService.verify(bearer, {
        secret: process.env.JWT_SECRET,
      })
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }
}
