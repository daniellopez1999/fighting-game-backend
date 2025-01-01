import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserEquipRepository } from 'src/repositories/user-equip.repository';
import { UpdateUserEquipmentDto } from './dto/update-user-equipment.dto';
import { DefenseRepository } from 'src/repositories/defense.repository';

@Injectable()
export class UserEquipmentService {
  constructor(
    private readonly userEquipmentRepository: UserEquipRepository,
    private readonly defenseRepository: DefenseRepository,
  ) {}

  async findByUserID(user_id: string) {
    return await this.userEquipmentRepository.findByUserID(user_id);
  }

  async updateUserEquipment(params: UpdateUserEquipmentDto) {
    try {
      //user_equiped_id is the row to update, defense_id is the new defense id to set
      const { defense_id, user_equiped_id } = params;
      const userEquip =
        await this.userEquipmentRepository.findUserEquipmentByID(
          user_equiped_id,
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
