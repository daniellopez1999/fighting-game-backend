import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mobs')
export class MobEntity {
  @PrimaryGeneratedColumn('uuid')
  mob_id: string;

  @Column()
  name: string;

  @Column()
  health: number;

  @Column()
  damage: number;
}
