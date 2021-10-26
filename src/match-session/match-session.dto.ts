import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator'
import { FilmCategories } from 'src/film/film.models'

export class CreateMatchSessionDTO {
  @IsNotEmpty() clientId: string
  @IsNotEmpty() guestId: string
  @IsOptional() lang: string
  @IsEmpty() hostSequenceCounter?: number
  @IsEmpty() guestSequenceCounter?: number
  @IsEmpty() hostLikedFilms?: string[]
  @IsEmpty() guestLikedFilms?: string[]
  @IsEmpty() matchedFilms?: string[]
  @IsNotEmpty() matchLimit: number
  @IsOptional() page?: number
  @IsEmpty() filmsIdsSequence?: string[]
  @IsOptional() category?: FilmCategories
  @IsOptional() filterParams?: Record<string, unknown>
  @IsOptional() userId?: string
}

export class UpdateMatchSessionDTO {
  @IsNotEmpty() userId: string
  @IsNotEmpty() matchSessionId: string
  @IsNotEmpty() filmId: number
  @IsNotEmpty() filmApproved: boolean
}
