import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UpdateUserEquipmentDto } from './dto/update-user-equipment.dto';
import { UserEquipmentService } from './user-equipment.service';

@Controller('user-equipment')
export class UserEquipmentController {
  constructor(private readonly userEquipmentService: UserEquipmentService) {}

  @Patch('update-defense')
  async updateUserEquipment(
    @Body() updateUserEquipment: UpdateUserEquipmentDto,
  ) {
    return this.userEquipmentService.updateUserEquipment(updateUserEquipment);
  }

  @Get('user-id/:id')
  async findOne(@Param('id') id: string) {
    return await this.userEquipmentService.findByUserID(id);
  }
}
