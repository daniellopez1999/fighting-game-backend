import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DefenseRepository } from 'src/repositories/defense.repository';
import { UsersEntity } from 'src/entities/user.entity';
import { CharacterService } from './character.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [],
  providers: [CharacterService],
})
export class CharacterModule {}
