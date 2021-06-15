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

  //связь между таблицами
  @Column()
  userOneId: string

  //связь между таблицами
  @Column()
  userTwoId: string

  //индекс, по которому будет браться айдишник фильма из filmsIdsSequence
  //если этот counter === filmsIdsSequence.length, то запушить в filmsIdsSequence
  //следующие 50 рандомных айдишников
  @Column()
  userOneSequenceCounter: number

  @Column()
  userTwoSequenceCounter: number

  @Column()
  filmsIdsSequence: string

  @Column('text', { array: true })
  matches: string[]

  //query params к запросу на  tmdb
  @Column()
  filterParams: string

  @Column()
  matchesLimit: number
}
