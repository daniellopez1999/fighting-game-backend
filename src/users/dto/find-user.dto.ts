import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
