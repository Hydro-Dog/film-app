import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { FilmController } from './film.controller'
import { FilmService } from './film.service'

@Module({
  imports: [HttpModule, JwtModule.register({})],
  controllers: [FilmController],
  providers: [FilmService],
  exports: [FilmService],
})
export class FilmModule {}
