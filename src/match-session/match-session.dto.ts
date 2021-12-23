import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator'
import { MatchSessionStatus } from 'src/entity/match-session.entity'
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
}

export class UpdateMatchSessionStatusDTO {
  @IsNotEmpty() matchSessionId: string
  @IsNotEmpty() status: MatchSessionStatus
}

// export class UpdateMatchSessionDTO {
//   @IsNotEmpty() userId: string
//   @IsNotEmpty() matchSessionId: string
//   @IsNotEmpty() filmId: number
//   @IsNotEmpty() filmApproved: boolean
// }
