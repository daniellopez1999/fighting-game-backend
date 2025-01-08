import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { DefenseType } from 'src/entities/defense.entity';

export class UpdateUserEquipmentDto {
  @IsUUID()
  @IsNotEmpty()
  user_equiped_id: string;
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
  @IsUUID()
  @IsNotEmpty()
  defense_id: string;
  @IsEnum(DefenseType)
  @IsNotEmpty()
  defense_type: DefenseType;
}
