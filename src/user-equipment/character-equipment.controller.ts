import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UpdateUserEquipmentDto } from './dto/update-character-equipment.dto';
import { characterEquipmentService } from './character-equipment.service';

@Controller('character-equipment')
export class UserEquipmentController {
  constructor(
    private readonly characterEquipmentService: characterEquipmentService,
  ) {}

  @Patch('update-defense')
  async updateUserEquipment(
    @Body() updateUserEquipment: UpdateUserEquipmentDto,
  ) {
    return this.characterEquipmentService.updateUserEquipment(
      updateUserEquipment,
    );
  }

  @Get('character-id/:id')
  async findOne(@Param('id') id: string) {
    return await this.characterEquipmentService.findByCharacter(id);
  }
}
