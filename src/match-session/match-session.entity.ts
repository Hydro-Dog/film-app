import { User } from 'src/user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class MatchSession {
  constructor(
    host: User,
    guest: User,
    region: string,
    lang: string,
    hostSequenceCounter: number,
    guestSequenceCounter: number,
    hostLikedFilms: string[],
    guestLikedFilms: string[],
    matchedFilms: string[],
    matchLimit: number,
    filmsIdsSequence: string[],
    category: string,
    filterParams: string,
    completed: boolean,
    accepted: boolean,
    declined: boolean
  ) {
    this.host = host
    this.guest = guest
    this.region = region
    this.lang = lang
    this.hostSequenceCounter = hostSequenceCounter
    this.guestSequenceCounter = guestSequenceCounter
    this.hostLikedFilms = hostLikedFilms
    this.guestLikedFilms = guestLikedFilms
    this.matchedFilms = matchedFilms
    this.matchLimit = matchLimit
    this.filmsIdsSequence = filmsIdsSequence
    this.category = category
    this.filterParams = filterParams
    this.completed = completed
    this.accepted = accepted
    this.declined = declined
  }

  @PrimaryGeneratedColumn()
  id: string

  @CreateDateColumn()
  created: Date

  @ManyToOne((type) => User, (user) => user.id)
  host: User
  @ManyToOne((type) => User, (user) => user.id)
  guest: User
  @Column() region?: string
  @Column() lang?: string
  @Column() hostSequenceCounter?: number
  @Column() guestSequenceCounter?: number
  @Column('text', { array: true }) hostLikedFilms?: string[]
  @Column('text', { array: true }) guestLikedFilms?: string[]
  @Column('text', { array: true }) matchedFilms?: string[]
  @Column() matchLimit: number
  @Column('text', { array: true }) filmsIdsSequence?: string[]
  @Column({ nullable: true }) category?: string
  @Column({ nullable: true }) filterParams?: string
  @Column({ nullable: true }) completed: boolean
  @Column({ nullable: true }) accepted: boolean
  @Column({ nullable: true }) declined: boolean
}
