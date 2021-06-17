import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class MatchSession {
  @PrimaryGeneratedColumn()
  id: string

  @CreateDateColumn()
  created: Date

  @Column() hostId: string
  @Column() guestId: string
  @Column() hostSequenceCounter?: number
  @Column() guestSequenceCounter?: number
  @Column('text', { array: true }) hostLikedFilms?: string[]
  @Column('text', { array: true }) guestLikedFilms?: string[]
  @Column('text', { array: true }) matchedFilms?: string[]
  @Column() matchesLimit: number
  @Column('text', { array: true }) filmsIdsSequence?: string[]
  @Column({ nullable: true }) category?: string
  @Column({ nullable: true }) filterParams?: string

  // @PrimaryGeneratedColumn()
  // id: string

  // @CreateDateColumn()
  // created: Date

  // //связь между таблицами
  // @Column()
  // hostId: string

  // //связь между таблицами
  // @Column()
  // guestId: string

  // //индекс, по которому будет браться айдишник фильма из filmsIdsSequence
  // //если этот counter === filmsIdsSequence.length, то запушить в filmsIdsSequence
  // //следующие 50 рандомных айдишников
  // @Column()
  // hostSequenceCounter: number

  // @Column()
  // guestSequenceCounter: number

  // @Column('text', { array: true })
  // hostLikedFilms: string[]

  // @Column('text', { array: true })
  // guestLikedFilms: string[]

  // @Column('text', { array: true })
  // matchedFilms: string[]

  // @Column()
  // matchesLimit: number

  // @Column()
  // filmsIdsSequence: string

  // @Column()
  // category: string
  // //query params к запросу на  tmdb
  // @Column()
  // filterParams: string
}
