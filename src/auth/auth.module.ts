import { UsersEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './auth.controller';
import { UsersService } from './auth.service';
import { UserEquippedEntity } from 'src/entities/user-equiped.entity';
import { DefenseEntity } from 'src/entities/defense.entity';
import { UsersRepository } from 'src/repositories/user.repository';
import { UserEquipRepository } from 'src/repositories/user-equip.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UserEquippedEntity, DefenseEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserEquipRepository],
})
export class UsersModule {}
