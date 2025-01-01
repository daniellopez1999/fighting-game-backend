import { DefenseEntity } from './defense.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from './user.entity';

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
}
