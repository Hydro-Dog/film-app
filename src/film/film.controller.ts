import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { ApiDTO } from './film.dto'
import { FilmService } from './film.service'

@Controller()
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get('api/getmovies')
  getMovies(@Body() data: ApiDTO) {
    console.log('data: ', data)
    if (data.filmCategory && data.filters) {
      throw new HttpException(
        'Both filters and categories are provided',
        HttpStatus.BAD_REQUEST
      )
    }

    if (data.filmCategory) {
      return this.filmService.getFilmsByCategory(
        data.pageNumbers,
        data.filmCategory
      )
    }

    return this.filmService.getFilmsByFilters(data.pageNumbers, data.filters)
  }
}
