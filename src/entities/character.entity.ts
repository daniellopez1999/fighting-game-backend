import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UsersEntity } from './user.entity';
@Entity()
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

  @Column()
  class: 'warrior' | 'archer' | 'mage' | 'assassin';

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
