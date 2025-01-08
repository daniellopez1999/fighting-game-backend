import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefenseEntity, DefenseType } from 'src/entities/defense.entity';
import { CharacterEquippedEntity } from 'src/entities/character-equiped.entity';
import { Equal, Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { AttackType } from 'src/entities/attack.entity';

@Injectable()
export class CharacterEquipRepository {
  constructor(
    @InjectRepository(CharacterEquippedEntity)
    private readonly CharacterEquipRepository: Repository<CharacterEquippedEntity>,
    @InjectRepository(DefenseEntity)
    private readonly defenseRepository: Repository<DefenseEntity>,
  ) {}

  async createUserEquip(character_id: string) {
    return await this.CharacterEquipRepository.save([
      {
        character: { character_id },
        defense: { defense_id: '4dbc3d24-bdee-4a43-b2e5-42556a472e35' },
        defense_type: DefenseType.ARMOR,
      },
      {
        character: { character_id },
        defense: { defense_id: '5fcf95f0-d0ea-46d8-9443-94c9aef2f034' },
        defense_type: DefenseType.BOOTS,
      },
      {
        character: { character_id },
        defense: { defense_id: '8b1c6e7e-b517-496b-bf88-b9f45cf07d98' },
        defense_type: DefenseType.GLOVES,
      },
      {
        character: { character_id },
        defense: { defense_id: 'b9b7bc31-76b4-42b7-a612-dc83616b4bb2' },
        defense_type: DefenseType.HELMET,
      },
      {
        character: { character_id },
        attack: { attack_id: '1a2b3c4d-5e6f-7890-abcd-ef1234567890' },
        attack_type: AttackType.SWORD,
      },
      {
        character: { character_id },
        attack: { attack_id: '4d5e6f7a-8b9c-0123-def1-234567890123' },
        attack_type: AttackType.DAGGER,
      },
    ]);
  }

  async findCharacterEquipmentByID(character_equiped_id: string) {
    return await this.CharacterEquipRepository.findOne({
      where: { character_equiped_id },
      relations: ['defense', 'character', 'character.user'],
    });
  }

  async updateUserEquip(userEquip: CharacterEquippedEntity) {
    return await this.CharacterEquipRepository.save(userEquip);
  }

  async findCharacterEquipmentByCharacterID(character_id: string) {
    return await this.CharacterEquipRepository.find({
      where: { character: { character_id } },
      relations: ['defense', 'attack', 'character'],
    });
  }
}
