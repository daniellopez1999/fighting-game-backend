import { UserType } from 'src/entities/user.entity';

export class ShortUserResponse {
  user_id: string;
  username: string;
  email: string;
  type: UserType;
  constructor(user: ShortUserResponse) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.type = user.type;
  }
}
