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
  @Column() matchLimit: number
  @Column('text', { array: true }) filmsIdsSequence?: string[]
  @Column({ nullable: true }) category?: string
  @Column({ nullable: true }) filterParams?: string
  @Column({ nullable: true }) completed: boolean
}
