import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MatchSessionEntity } from './match-session.entity'
import { Exclude } from 'class-transformer'

@Entity({ name: 'user' })
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

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

  @Exclude()
  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  accessToken: string

  @Column({ nullable: true })
  refreshToken: string

  @Column('uuid', { nullable: true })
  currentMatchSession: string

  @OneToMany((type) => MatchSessionEntity, (matchSession) => matchSession.guest)
  @Column('uuid', { array: true, nullable: true })
  invites: string[]

  @OneToMany((type) => MatchSessionEntity, (matchSession) => matchSession.host)
  @Column('uuid', { array: true, nullable: true })
  hosted: string[]

  @Column({ nullable: true })
  emailConfirmed: boolean
}
