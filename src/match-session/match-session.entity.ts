import { User } from 'src/user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class MatchSession {
  constructor(
    host: User,
    guest: User,
    lang: string,
    hostCurrentFilmIndex: number,
    guestCurrentFilmIndex: number,
    hostLikedFilms: string[],
    guestLikedFilms: string[],
    hostLikedFilmIndex: number,
    guestLikedFilmIndex: number,
    matchedMoviesIds: string[],
    matchLimit: number,
    completed: boolean,
    accepted: boolean,
    declined: boolean,
    filmsSequenceJson: string[],
    category: string,
    filterParams: string,
    filmsMatchTookPlace: boolean
  ) {
    this.host = host
    this.guest = guest
    this.lang = lang
    this.hostCurrentFilmIndex = hostCurrentFilmIndex
    this.guestCurrentFilmIndex = guestCurrentFilmIndex
    this.hostLikedFilms = hostLikedFilms
    this.guestLikedFilms = guestLikedFilms
    this.hostLikedFilmIndex = hostLikedFilmIndex
    this.guestLikedFilmIndex = guestLikedFilmIndex
    this.matchedMoviesIds = matchedMoviesIds
    this.matchLimit = matchLimit
    this.completed = completed
    this.accepted = accepted
    this.declined = declined
    this.filmsSequenceJson = filmsSequenceJson
    this.category = category
    this.filterParams = filterParams
    this.filmsMatchTookPlace = filmsMatchTookPlace
  }

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({ nullable: true }) region?: string
  @Column({ nullable: true }) category?: string
  @Column('text', { array: true }) filmsSequenceJson?: string[]

  @ManyToOne((type) => User, (user) => user.id)
  host: User
  @ManyToOne((type) => User, (user) => user.id)
  guest: User
  @Column({ nullable: true }) lang?: string
  @Column() hostCurrentFilmIndex?: number
  @Column() guestCurrentFilmIndex?: number
  @Column('text', { array: true }) hostLikedFilms?: string[]
  @Column('text', { array: true }) guestLikedFilms?: string[]
  @Column('text', { nullable: true }) hostLikedFilmIndex: number
  @Column('text', { nullable: true }) guestLikedFilmIndex: number
  @Column({ nullable: true }) filterParams?: string
  @Column('text', { array: true }) matchedMoviesIds?: string[]
  @Column() matchLimit: number
  @Column({ nullable: true }) completed: boolean
  @Column({ nullable: true }) accepted: boolean
  @Column({ nullable: true }) declined: boolean
  @Column({ nullable: true }) filmsMatchTookPlace: boolean
}
