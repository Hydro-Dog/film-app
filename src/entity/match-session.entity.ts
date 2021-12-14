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
  Pending,
  Accepted,
  Declined,
}

export interface MatchSessionPlayer {
  currentFilmIndex: number
  likedFilms: string
  likedFilmsIndex: number
}

@Entity({ name: 'matchSession' })
export class MatchSessionEntity {
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

  @Column('text', { array: true }) matchedMoviesJSON?: string[]

  @Column() matchLimit: number

  @Column({
    type: 'enum',
    enum: MatchSessionStatus,
  })
  status: MatchSessionStatus

  @Column('json') hostMatchStats: string
  @Column('json') guestMatchStats: string
}
