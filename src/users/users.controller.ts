import { Controller } from '@nestjs/common';
import { UsersService } from './users.servicel';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  findOne(user_id: string) {
    return this.usersService.findOne(user_id);
  }
}
