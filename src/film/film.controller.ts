import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { ApiDTO } from './film.dto'
import { FilmService } from './film.service'

@UseGuards(AuthGuard)
@Controller()
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get('api/regions')
  getAvailableRegions() {
    return this.filmService.getAvailableRegions()
  }

  // @Get('api/movies')
  // getMovies(@Body() data: ApiDTO) {
  //   if (data.filmCategory && data.filterParams) {
  //     throw new HttpException(
  //       'Both filters and categories are provided',
  //       HttpStatus.BAD_REQUEST
  //     )
  //   }

  //   if (data.filmCategory) {
  //     return this.filmService.getFilmsByCategory(
  //       data.pageNumbers,
  //       data.filmCategory,
  //       data.lang
  //     )
  //   }

  //   return this.filmService.getFilmsByFilters(
  //     data.pageNumbers,
  //     data.filterParams
  //   )
  // }
}
