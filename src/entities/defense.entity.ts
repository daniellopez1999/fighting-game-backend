import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum DefenseType {
  ARMOR = 'armor',
  GLOVES = 'gloves',
  HELMET = 'helmet',
  BOOTS = 'boots',
}

@Entity('defense')
export class DefenseEntity {
  @PrimaryGeneratedColumn('uuid')
  defense_id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: DefenseType,
  })
  defense_type: DefenseType;

  @Column()
  defense: number;

  @Column()
  agility: number;

  @Column()
  attack_speed: number;
}
