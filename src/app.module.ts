import { Logger, Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { FilmModule } from './film/film.module'
import { GameModeModule } from './game-modes/game-mode.module'
import { MailModule } from './mail/mail.module'
import { MatchSessionModule } from './match-session/match-session.module'
import { HttpErrorFilter } from './shared/http-error.filter'
import { LoggerInterceptor } from './shared/logger.interceptor'
import { TimeoutInterceptor } from './shared/timeout.interceptor'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    MatchSessionModule,
    FilmModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
