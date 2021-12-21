import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator'
import { FilmCategories } from 'src/film/film.models'

export class GetMatchSessionDTO {
  matchSessionId?: string
  userId?: string
}

export class CreateMatchSessionDTO {
  @IsNotEmpty() hostId: string
  @IsNotEmpty() guestId: string
  @IsNotEmpty() matchLimit: number
  @IsOptional() category: FilmCategories
  // @IsOptional() category?: FilmCategories
  // @IsOptional() lang: string
  // @IsEmpty() hostSequenceCounter?: number
  // @IsEmpty() guestSequenceCounter?: number
  // @IsEmpty() hostLikedFilms?: string[]
  // @IsEmpty() guestLikedFilms?: string[]
  // @IsEmpty() matchedFilms?: string[]
  // @IsOptional() page?: number
  // @IsEmpty() filmsIdsSequence?: string[]
  // @IsOptional() filterParams?: Record<string, unknown>
  // @IsOptional() userId?: string
}

export class UpdateMatchSessionDTO {
  @IsNotEmpty() userId: string
  @IsNotEmpty() matchSessionId: string
  @IsNotEmpty() filmId: number
  @IsNotEmpty() filmApproved: boolean
}
