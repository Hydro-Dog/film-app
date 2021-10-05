import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator'
import { FilmCategories } from 'src/film/film.models'

export class CreateMatchSessionDTO {
  @IsNotEmpty() clientId: string
  @IsNotEmpty() guestId: string
  @IsOptional() region: string
  @IsOptional() lang: string
  @IsEmpty() hostSequenceCounter?: number
  @IsEmpty() guestSequenceCounter?: number
  @IsEmpty() hostLikedFilms?: string[]
  @IsEmpty() guestLikedFilms?: string[]
  @IsEmpty() matchedFilms?: string[]
  @IsNotEmpty() matchLimit: number
  @IsEmpty() filmsIdsSequence?: string[]
  @IsOptional() category?: FilmCategories
  @IsOptional() filterParams?: Record<string, unknown>
  @IsOptional() id?: string
}

export class UpdateMatchSessionDTO {
  @IsNotEmpty() userId: string
  @IsNotEmpty() matchSessionId: string
  @IsNotEmpty() filmId: string
  @IsNotEmpty() filmApproved: boolean
}
