import { UsersEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEquippedEntity } from 'src/entities/user-equiped.entity';
import { DefenseEntity } from 'src/entities/defense.entity';
import { UsersRepository } from 'src/repositories/user.repository';
import { UserEquipRepository } from 'src/repositories/user-equip.repository';
import { UserEquipmentController } from './user-equipment.controller';
import { UserEquipmentService } from './user-equipment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UserEquippedEntity, DefenseEntity]),
  ],
  controllers: [UserEquipmentController],
  providers: [UserEquipmentService, UsersRepository, UserEquipRepository],
})
export class UserEquipmentModule {}
