import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MobEntity } from './mob.entity';
@Entity('levels')
export class LevelEntity {
  @PrimaryGeneratedColumn('uuid')
  level_id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'] })
  difficulty: 'easy' | 'medium' | 'hard';
}
