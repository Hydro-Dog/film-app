import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MatchSession } from './match-session.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({
    unique: true,
  })
  email: string

  @Column({
    unique: true,
    nullable: true,
  })
  username: string

  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  accessToken: string

  @Column({ nullable: true })
  refreshToken: string

  @Column('uuid', { nullable: true })
  currentMatchSession: string

  @OneToMany((type) => MatchSession, (matchSession) => matchSession.guest)
  @Column('uuid', { array: true, nullable: true })
  invites: string[]

  @OneToMany((type) => MatchSession, (matchSession) => matchSession.host)
  @Column('uuid', { array: true, nullable: true })
  hosted: string[]

  @Column()
  emailConfirmed: boolean
}
