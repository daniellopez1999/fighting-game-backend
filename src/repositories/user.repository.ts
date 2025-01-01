import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findById(user_id: string) {
    return await this.userRepository.findOne({ where: { user_id: user_id } });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save({ ...user, password: null });
  }

  async updateUser(user: UsersEntity) {
    return await this.userRepository.save(user);
  }
}
