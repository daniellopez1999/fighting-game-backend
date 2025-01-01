import { DefenseEntity } from './defense.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_equiped')
export class UserEquippedEntity {
  @PrimaryGeneratedColumn()
  user_equiped_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  user: UserEntity;

  @ManyToOne(() => DefenseEntity, (defense) => defense.defense_id)
  defense: DefenseEntity;
}
