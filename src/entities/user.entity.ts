import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  MOD = 'mod',
}
@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

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
}
