import { DefenseEntity } from './defense.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity('user_equiped')
export class UserEquippedEntity {
  @PrimaryGeneratedColumn('uuid')
  user_equiped_id: string;

  @ManyToOne(() => UsersEntity, (user) => user.user_id)
  user: UsersEntity;

  @ManyToOne(() => DefenseEntity, (defense) => defense.defense_id, {
    nullable: true,
  })
  defense: DefenseEntity;
}
