import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CharacterEquipRepository } from 'src/repositories/user-equip.repository';
import { UpdateUserEquipmentDto } from './dto/update-character-equipment.dto';
import { DefenseRepository } from 'src/repositories/defense.repository';

@Injectable()
export class characterEquipmentService {
  logger = new Logger('CharacterEquipmentService');
  constructor(
    private readonly userEquipmentRepository: CharacterEquipRepository,
    private readonly defenseRepository: DefenseRepository,
  ) {}

  async findByCharacter(character_id: string) {
    return await this.userEquipmentRepository.findCharacterEquipmentByCharacterID(
      character_id,
    );
  }

  async updateUserEquipment(params: UpdateUserEquipmentDto) {
    try {
      //character_equiped_id is the row to update, defense_id is the new defense id to set
      const { defense_id, character_equiped_id } = params;
      const userEquip =
        await this.userEquipmentRepository.findCharacterEquipmentByID(
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
