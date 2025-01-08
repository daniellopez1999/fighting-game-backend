import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefenseEntity, DefenseType } from 'src/entities/defense.entity';
import { CharacterEquippedEntity } from 'src/entities/character-equiped.entity';
import { Equal, Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class CharacterEquipRepository {
  constructor(
    @InjectRepository(CharacterEquippedEntity)
    private readonly CharacterEquipRepository: Repository<CharacterEquippedEntity>,
    @InjectRepository(DefenseEntity)
    private readonly defenseRepository: Repository<DefenseEntity>,
  ) {}

  async createUserEquip(user_id: string) {
    return await this.CharacterEquipRepository.save([
      {
        user: { user_id },
        defense: { defense_id: '4dbc3d24-bdee-4a43-b2e5-42556a472e35' },
        defense_type: DefenseType.ARMOR,
      },
      {
        user: { user_id },
        defense: { defense_id: '5fcf95f0-d0ea-46d8-9443-94c9aef2f034' },
        defense_type: DefenseType.BOOTS,
      },
      {
        user: { user_id },
        defense: { defense_id: '8b1c6e7e-b517-496b-bf88-b9f45cf07d98' },
        defense_type: DefenseType.GLOVES,
      },
      {
        user: { user_id },
        defense: { defense_id: 'b9b7bc31-76b4-42b7-a612-dc83616b4bb2' },
        defense_type: DefenseType.HELMET,
      },
    ]);
  }

  async findUserEquipmentByID(character_equiped_id: string) {
    return await this.CharacterEquipRepository.findOne({
      where: { character_equiped_id },
      relations: ['defense'],
    });
  }

  async updateUserEquip(userEquip: CharacterEquippedEntity) {
    return await this.CharacterEquipRepository.save(userEquip);
  }

  async findByCharacterID(character_id: string) {
    return await this.CharacterEquipRepository.find({
      where: { character: { character_id } },
      relations: ['defense', 'character.user'],
    });
  }
}
