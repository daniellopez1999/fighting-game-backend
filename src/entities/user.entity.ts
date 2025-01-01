import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEquippedEntity } from './user-equiped.entity';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  MOD = 'mod',
}
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @OneToMany(() => UserEquippedEntity, (userEquipped) => userEquipped.user)
  equippedItems: UserEquippedEntity[];
}
