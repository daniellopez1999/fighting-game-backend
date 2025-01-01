import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUserEquipment {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
  @IsUUID()
  @IsNotEmpty()
  defense_id: string;
}
