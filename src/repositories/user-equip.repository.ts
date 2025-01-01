import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefenseEntity } from 'src/entities/defense.entity';
import { UserEquippedEntity } from 'src/entities/user-equiped.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserEquipRepository {
  constructor(
    @InjectRepository(UserEquippedEntity)
    private readonly userEquipRepository: Repository<UserEquippedEntity>,
    @InjectRepository(DefenseEntity)
    private readonly defenseRepository: Repository<DefenseEntity>,
  ) {}

  async createUserEquip(user_id: string) {
    return await this.userEquipRepository.save({
      user: { user_id },
      defense: null,
    });
  }

  async updateUserEquip(userEquip: UserEquippedEntity) {
    return await this.userEquipRepository.save(userEquip);
  }
}
