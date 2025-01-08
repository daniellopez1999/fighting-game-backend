import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CharacterEquipRepository } from 'src/repositories/user-equip.repository';
import { UpdateUserEquipmentDto } from './dto/update-character-equipment.dto';
import { DefenseRepository } from 'src/repositories/defense.repository';

@Injectable()
export class characterEquipmentService {
  constructor(
    private readonly userEquipmentRepository: CharacterEquipRepository,
    private readonly defenseRepository: DefenseRepository,
  ) {}

  async findByCharacter(user_id: string) {
    return await this.userEquipmentRepository.findByCharacterID(user_id);
  }

  async updateUserEquipment(params: UpdateUserEquipmentDto) {
    try {
      //character_equiped_id is the row to update, defense_id is the new defense id to set
      const { defense_id, character_equiped_id } = params;
      const userEquip =
        await this.userEquipmentRepository.findUserEquipmentByID(
          character_equiped_id,
        );
      const newDefense = await this.defenseRepository.findById(defense_id);
      userEquip.defense = newDefense;
      return this.userEquipmentRepository.updateUserEquip(userEquip);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: number): void {}
}
