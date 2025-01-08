import { ConflictException, Injectable } from '@nestjs/common';
import { Character } from './Character';
import { UserType } from 'src/entities/user.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getCharacterStats } from './utilts';
import { CharacterRepository } from 'src/repositories/character.repository';
import { CharacterEquipRepository } from 'src/repositories/user-equip.repository';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly CharacterEquipRepository: CharacterEquipRepository,
  ) {}

  getCharacterById(character_id: string) {
    const character = new Character({
      agility: 1,
      attack: 1,
      attack_speed: 1,
      character_id: character_id,
      class: 'warrior',
      defense: 1,
      health: 1,
      level: 1,
      name: 'test',
      user: {
        email: 'test',
        type: UserType.ADMIN,
        user_id: 'test',
        username: 'test',
      },
    });
    return character;
  }

  async createCharacter(CreateCharacterDTO: CreateCharacterDto) {
    const { name, user_id } = CreateCharacterDTO;

    const nameExists = await this.characterRepository.findByName(name);

    if (nameExists) {
      throw new ConflictException('Character name already exists');
    }

    const stats = getCharacterStats(CreateCharacterDTO.class);

    const newCharacter = await this.characterRepository.createCharacter(
      name,
      user_id,
      CreateCharacterDTO.class,
      stats,
    );

    await this.CharacterEquipRepository.createUserEquip(
      newCharacter.character_id,
    );

    return newCharacter;
  }

  updateCharacter(id: string, updatedCharacter: Character) {}

  deleteCharacter(id: string) {}
}
