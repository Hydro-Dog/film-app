import { IsNotEmpty, IsOptional } from 'class-validator'
import { FilmCategories } from './film.models'

export class ApiDTO {
  @IsNotEmpty() pageNumbers: string
  @IsOptional() filmCategory?: FilmCategories
  @IsOptional() filterParams?: object
}
