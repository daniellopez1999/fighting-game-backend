import { Body, Controller, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post('create-character')
  async createCharacter(@Body() CreateCharacterDTO: CreateCharacterDto) {
    return await this.characterService.createCharacter(CreateCharacterDTO);
  }
}
