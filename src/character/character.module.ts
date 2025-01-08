import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DefenseRepository } from 'src/repositories/defense.repository';
import { UsersEntity } from 'src/entities/user.entity';
import { CharacterService } from './character.service';
import { CharacterEntity } from 'src/entities/character.entity';
import { CharacterRepository } from 'src/repositories/character.repository';
import { CharacterController } from './character.controller';
import { CharacterEquipRepository } from 'src/repositories/user-equip.repository';
import { CharacterEquippedEntity } from 'src/entities/character-equiped.entity';
import { DefenseEntity } from 'src/entities/defense.entity';
import { AttackEntity } from 'src/entities/attack.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      CharacterEntity,
      CharacterEquippedEntity,
      DefenseEntity,
      AttackEntity,
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository, CharacterEquipRepository],
})
export class CharacterModule {}
