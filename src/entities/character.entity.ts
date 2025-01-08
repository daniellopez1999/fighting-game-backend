import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UsersEntity } from './user.entity';

export enum CharacterClass {
  Warrior = 'warrior',
  Archer = 'archer',
  Mage = 'mage',
  Assassin = 'assassin',
}

@Entity('user_characters')
export class CharacterEntity {
  @PrimaryGeneratedColumn('uuid')
  character_id: string;

  @ManyToOne(() => UsersEntity, (user) => user.user_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ unique: true })
  name: string;

  @Column({ enum: CharacterClass })
  class: CharacterClass;

  @Column()
  level: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  health: number;

  @Column()
  attack_speed: number;

  @Column()
  agility: number;
}
