import { DefenseEntity, DefenseType } from './defense.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { UsersEntity, UserType } from './user.entity';
import { AttackType } from './attack.entity';

@Entity('user_equiped')
export class UserEquippedEntity {
  @PrimaryGeneratedColumn('uuid')
  user_equiped_id: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => DefenseEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'defense_id' })
  defense: DefenseEntity;

  @Column({
    type: 'enum',
    enum: DefenseType,
    nullable: true,
  })
  defense_type: DefenseType;

  @Column({ nullable: true, type: 'enum', enum: AttackType })
  attack_type: AttackType;
}
