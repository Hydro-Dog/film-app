import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'gameMode' })
export class GameModeEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  value: string
}
