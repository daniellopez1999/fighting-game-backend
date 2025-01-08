import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { CreateCharacterDto } from 'src/character/dto/create-character.dto';
import { CharacterStats, getCharacterStats } from 'src/character/utilts';
import { CharacterClass, CharacterEntity } from 'src/entities/character.entity';
import { DefenseEntity } from 'src/entities/defense.entity';
import { UsersEntity } from 'src/entities/user.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class CharacterRepository {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
  ) {}

  async findByName(name: string) {
    return await this.characterRepository.findOne({ where: { name } });
  }

  async createCharacter(
    name: string,
    user_id: string,
    characterClass: CharacterClass,
    stats: CharacterStats,
  ) {
    const character = this.characterRepository.create();
    character.name = name;
    character.class = characterClass;
    character.level = 1;
    character.health = stats.health;
    character.attack = stats.attack;
    character.defense = stats.defense;
    character.agility = stats.agility;
    character.attack_speed = stats.attack_speed;
    return await this.characterRepository.save({
      ...character,
      user: { user_id },
    });
  }
}
