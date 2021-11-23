import { Logger, Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { basename, dirname, join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { FilmModule } from './film/film.module'
import { MatchSessionModule } from './match-session/match-session.module'
import { HttpErrorFilter } from './shared/http-error.filter'
import { LoggerInterceptor } from './shared/logger.interceptor'
import { TimeoutInterceptor } from './shared/timeout.interceptor'
import { UserModule } from './user/user.module'
import { MailModule } from './mail/mail.module'
import { GameModeModule } from './game-modes/game-mode.module'
import { AppGetaway } from './app-getaway/app-getaway'

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_URL = process.env.DB_URL
const ENVIRONMENT = process.env.ENVIRONMENT

const dev = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  entities: [
    join(__dirname, '**', '*.entity.{ts,js}'),
    join(basename(dirname(__filename)), '**', '*.entity.{ts,js}'),
  ],
  synchronize: true,
  autoLoadEntities: true,
}

const prod = {
  type: 'postgres',
  url: DB_URL,
  logging: true,
  entities: [
    join(__dirname, '**', '*.entity.{ts,js}'),
    join(basename(dirname(__filename)), '**', '*.entity.{ts,js}'),
  ],
  synchronize: false,
  autoLoadEntities: false,
  migrations: ['src/migration/**/*.js'],
}

@Module({
  imports: [
    getTypeOrmConfig(),
    UserModule,
    MatchSessionModule,
    FilmModule,
    GameModeModule,
    AuthModule,
    MailModule,
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

function getTypeOrmConfig() {
  return TypeOrmModule.forRoot(
    (ENVIRONMENT === 'dev' ? dev : prod) as TypeOrmModuleOptions
  )
}
