import { IsNotEmpty, IsOptional } from 'class-validator'
import { FilmCategories } from './film.models'

// export class ApiDTO {
//   @IsNotEmpty() pageNumbers: string
//   @IsNotEmpty() lang: string
//   @IsOptional() filmCategory?: FilmCategories
//   @IsOptional() filterParams?: Record<string, unknown>
// }

export interface Film {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
