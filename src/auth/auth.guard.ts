import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Observable, of } from 'rxjs'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm/repository/Repository'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
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
