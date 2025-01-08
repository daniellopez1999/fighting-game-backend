import { DefenseEntity, DefenseType } from './defense.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { UsersEntity, UserType } from './user.entity';

export enum AttackType {
  SWORD = 'sword',
  BOW = 'bow',
  STAFF = 'staff',
  DAGGER = 'dagger',
  AXE = 'axe',
  SPEAR = 'spear',
  WHIP = 'whip',
}

@Entity('attack')
export class AttackEntity {
  @PrimaryGeneratedColumn('uuid')
  attack_id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'enum', enum: AttackType })
  attack_type: AttackType;

  @Column()
  attack: number;

  @Column()
  agility: number;

  @Column()
  attack_speed: number;
}
