import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UpdateUserEquipment } from './dto/update-user-equipment.dto';
import { UserEquipmentService } from './user-equipment.service';

@Controller('user-equipment')
export class UserEquipmentController {
  constructor(private readonly userEquipmentService: UserEquipmentService) {}

  @Patch()
  async updateUserEquipment(@Body() updateUserEquipment: UpdateUserEquipment) {
    return this.userEquipmentService.update();
  }

  @Get('user-id/:id')
  async findOne(@Param('id') id: string) {
    return await this.userEquipmentService.findByUserID(id);
  }
}
