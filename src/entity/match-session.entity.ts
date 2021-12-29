import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'

export enum MatchSessionStatus {
  Pending = 0,
  Accepted = 1,
  Declined = 2,
  Completed = 3,
}

export interface MatchSessionPlayer {
  currentFilmIndex: number
  likedFilms: string
  likedFilmsIndex: number
}

@Entity({ name: 'matchSession' })
export class MatchSessionEntity {
  constructor(partial: Partial<MatchSessionEntity>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @Column({ nullable: true }) category?: string

  /**
   * filmsSequence - JSON
   * @param filmsSequence
   */
  @Column('text', { array: true }) filmsSequence: string[]

  @ManyToOne((type) => UserEntity, (user) => user.id)
  host: UserEntity

  @ManyToOne((type) => UserEntity, (user) => user.id)
  guest: UserEntity

  @Column('json', { nullable: true }) filterParams: string

  @Column('text', { nullable: true, array: true }) matchedMovies?: string[]

  @Column() matchLimit: number

  @Column({
    type: 'enum',
    enum: MatchSessionStatus,
  })
  status: MatchSessionStatus

  @Column({ nullable: true }) hostCurrentFilmIndex?: number
  @Column({ nullable: true }) guestCurrentFilmIndex?: number
  @Column('text', { nullable: true, array: true }) hostLikedFilms?: string[]
  @Column('text', { nullable: true, array: true }) guestLikedFilms?: string[]

  //TODO: можно удалить
  @Column('text', { nullable: true }) hostLikedFilmIndex: number
  @Column('text', { nullable: true }) guestLikedFilmIndex: number
}
