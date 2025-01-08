import { Injectable } from '@nestjs/common';
import { Character } from './Character';
import { UserType } from 'src/entities/user.entity';

@Injectable()
export class CharacterService {
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

  createCharacter(character: Character) {}

  updateCharacter(id: string, updatedCharacter: Character) {}

  deleteCharacter(id: string) {}
}
