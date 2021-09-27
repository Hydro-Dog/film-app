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
  @PrimaryGeneratedColumn()
  id: string

  @CreateDateColumn()
  created: Date

  @ManyToOne((type) => User, (user) => user.id)
  @Column()
  hostId: string
  // @Column() hostName: string
  @ManyToOne((type) => User, (user) => user.id)
  @Column()
  guestId: string
  // @Column() guestName: string
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
}
