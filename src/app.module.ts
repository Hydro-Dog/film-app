import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
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

const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

@Module({
  imports: [
    getTypeOrmConfig(),
    UserModule,
    MatchSessionModule,
    FilmModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username,
    password,
    database,
    logging: true,
    entities: [
      join(__dirname, '**', '*.entity.{ts,js}'),
      join(basename(dirname(__filename)), '**', '*.entity.{ts,js}'),
    ],
    synchronize: true,
    autoLoadEntities: true,
  })
}
