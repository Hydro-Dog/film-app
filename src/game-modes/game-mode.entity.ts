import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class GameMode {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  value: string
}
