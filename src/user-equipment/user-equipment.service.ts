import { Injectable } from '@nestjs/common';
import { UserEquipRepository } from 'src/repositories/user-equip.repository';

@Injectable()
export class UserEquipmentService {
  constructor(private readonly userEquipmentService: UserEquipRepository) {}

  async findByUserID(user_id: string) {
    return await this.userEquipmentService.findByUserID(user_id);
  }

  update() {}

  remove(id: number): void {}
}
