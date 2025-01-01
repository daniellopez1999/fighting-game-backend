import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LevelEntity } from './level.entity';
import { MobEntity } from './mob.entity';

@Entity('level_has_mobs')
export class LevelMob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LevelEntity)
  @JoinColumn({ name: 'level_id' })
  level: LevelEntity;

  @ManyToOne(() => MobEntity)
  @JoinColumn({ name: 'mob_id' })
  mob: MobEntity;
}
