import { UsersEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CharacterEquippedEntity } from 'src/entities/character-equiped.entity';
import { DefenseEntity } from 'src/entities/defense.entity';
import { UsersRepository } from 'src/repositories/user.repository';
import { CharacterEquipRepository } from 'src/repositories/user-equip.repository';
import { UserEquipmentController } from './character-equipment.controller';
import { characterEquipmentService } from './character-equipment.service';
import { DefenseRepository } from 'src/repositories/defense.repository';
import { CharacterEntity } from 'src/entities/character.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      CharacterEquippedEntity,
      DefenseEntity,
      CharacterEntity,
    ]),
  ],
  controllers: [UserEquipmentController],
  providers: [
    characterEquipmentService,
    UsersRepository,
    CharacterEquipRepository,
    DefenseRepository,
  ],
})
export class CharacterEquipmentModule {}
