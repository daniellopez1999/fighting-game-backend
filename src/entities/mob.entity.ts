import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum MobType {
  NORMAL = 'normal',
  BOSS = 'boss',
}

enum MobElement {
  FIRE = 'fire',
  WATER = 'water',
  EARTH = 'earth',
  WIND = 'wind',
}

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

  @Column()
  defense: number;

  @Column()
  experience: number;

  @Column()
  image: string;

  @Column()
  gold: number;

  @Column()
  type: MobType;

  @Column({ enum: MobElement, nullable: false })
  element: MobElement;
}
