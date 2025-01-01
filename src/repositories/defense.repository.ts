import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { DefenseEntity } from 'src/entities/defense.entity';
import { UsersEntity } from 'src/entities/user.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class DefenseRepository {
  constructor(
    @InjectRepository(DefenseEntity)
    private readonly defenseRepository: Repository<DefenseEntity>,
  ) {}

  async findById(defense_id: string) {
    return await this.defenseRepository.findOne({
      where: { defense_id: defense_id },
    });
  }
}
