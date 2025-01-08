import { DefenseEntity, DefenseType } from './defense.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { UsersEntity, UserType } from './user.entity';
import { AttackEntity, AttackType } from './attack.entity';
import { CharacterEntity } from './character.entity';

@Entity('character_equiped')
export class CharacterEquippedEntity {
  @PrimaryGeneratedColumn('uuid')
  character_equiped_id: string;

  @ManyToOne(() => CharacterEntity, (character) => character.character_id)
  @JoinColumn({ name: 'character_id' })
  character: CharacterEntity;

  @ManyToOne(() => DefenseEntity, { nullable: true })
  @JoinColumn({ name: 'defense_id' })
  defense: DefenseEntity;

  @ManyToOne(() => AttackEntity, { nullable: true })
  @JoinColumn({ name: 'attack_id' })
  attack: AttackEntity;

  @Column({ nullable: true, type: 'enum', enum: AttackType })
  attack_type: AttackType;

  @Column({
    type: 'enum',
    enum: DefenseType,
    nullable: true,
  })
  defense_type: DefenseType;
}
