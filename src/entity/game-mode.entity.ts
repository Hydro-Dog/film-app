import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'gameMode' })
export class GameMode {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  value: string
}
