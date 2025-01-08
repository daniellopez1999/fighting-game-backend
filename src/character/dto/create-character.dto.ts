import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CharacterClass } from 'src/entities/character.entity';
CharacterClass;
export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(CharacterClass)
  class: CharacterClass;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
