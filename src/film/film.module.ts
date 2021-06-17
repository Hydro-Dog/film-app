import { HttpModule, Module } from '@nestjs/common'
import { FilmController } from './film.controller'
import { FilmService } from './film.service'

@Module({
  imports: [HttpModule],
  controllers: [FilmController],
  providers: [FilmService],
  exports: [FilmService],
})
export class FilmModule {}
