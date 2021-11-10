import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { FilmService } from './film.service'

@UseGuards(AuthGuard)
@Controller()
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get('api/regions')
  getAvailableRegions() {
    return this.filmService.getAvailableRegions()
  }
}
