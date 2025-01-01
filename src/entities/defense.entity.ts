import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum DefenseType {
  ARMOR = 'armor',
  GLOVES = 'gloves',
  HELMET = 'helmet',
  BOOTS = 'boots',
}

@Entity('defense')
export class DefenseEntity {
  @PrimaryGeneratedColumn()
  defense_id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: DefenseType,
  })
  type: DefenseType;

  @Column()
  defense: number;

  @Column()
  agility: number;

  @Column()
  attack_speed: number;
}
