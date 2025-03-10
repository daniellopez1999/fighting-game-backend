import { UsersEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './auth.controller';
import { UsersService } from './auth.service';
import { CharacterEquippedEntity } from 'src/entities/character-equiped.entity';
import { DefenseEntity } from 'src/entities/defense.entity';
import { UsersRepository } from 'src/repositories/user.repository';
import { CharacterEquipRepository } from 'src/repositories/user-equip.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      CharacterEquippedEntity,
      DefenseEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CharacterEquipRepository],
})
export class UsersModule {}
