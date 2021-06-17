import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator'
import { FilmCategories } from 'src/film/film.models'

export class MatchSessionDTO {
  @IsNotEmpty() hostId: string
  @IsNotEmpty() guestId: string
  @IsEmpty() hostSequenceCounter?: number
  @IsEmpty() guestSequenceCounter?: number
  @IsEmpty() hostLikedFilms?: string[]
  @IsEmpty() guestLikedFilms?: string[]
  @IsEmpty() matchedFilms?: string[]
  @IsNotEmpty() matchesLimit: number
  @IsEmpty() filmsIdsSequence?: string[]
  @IsOptional() category?: FilmCategories
  @IsOptional() filterParams?: object
}
