import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'

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

@Entity()
export class MatchSession {
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

  @ManyToOne((type) => User, (user) => user.id)
  host: User

  @ManyToOne((type) => User, (user) => user.id)
  guest: User

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
