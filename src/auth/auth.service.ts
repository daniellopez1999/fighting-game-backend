import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersRepository } from 'src/repositories/user.repository';
import { DataSource, Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { decryptToken, generateUrlWithEncryptedToken } from './utils/utils';
import { ConfirmPasswordDto } from './dto/confirm-password.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as CONFIG_FILE from './config.json';
import { LoginUserDto } from './dto/login.dto';
import { ShortUserResponse } from './utils/user';
import { UserEquippedEntity } from 'src/entities/user-equiped.entity';
import { UserEquipRepository } from 'src/repositories/user-equip.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly userEquipRepository: UserEquipRepository,
    private dataSource: DataSource,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { email, username } = createUserDto;

      const emailFound = await this.userRepository.findByEmail(email);

      if (emailFound) {
        throw new ConflictException('This email has been already used');
      }
      const userFound = await this.userRepository.findByUsername(username);

      if (userFound) {
        throw new ConflictException('This username has been already used');
      }

      const user = await this.userRepository.createUser(createUserDto);
      await this.userEquipRepository.createUserEquip(user.user_id);

      const temporalURL = generateUrlWithEncryptedToken(user.user_id);

      //TODO: Send email with temporalURL

      return { user, temporalURL };
    } catch (error) {
      throw new InternalServerErrorException(`Error creating user: ${error}`);
    } finally {
    }
  }

  async confirmPassword(confirmPasswordDto: ConfirmPasswordDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { password, confirmPassword, token } = confirmPasswordDto;
      if (password !== confirmPassword) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Password and Confirm Password must be the same',
        });
      }

      const decryptedToken = decryptToken(token);

      let decoded;
      try {
        decoded = jwt.verify(decryptedToken, process.env.SECRET_KEY);
      } catch (err) {
        throw new BadRequestException('Invalid or expired token');
      }

      const user = await this.userRepository.findById(decoded.userId);
      if (!user) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;

      const updatedUser = await this.userRepository.updateUser(user);

      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error confirming password: ${error}`,
      );
    } finally {
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: CONFIG_FILE.LOGIN_EXPIRATION_TIME },
    );

    const userInstance = new ShortUserResponse(user);

    return { token, userInstance };
  }

  async findOne(params: FindUserDto) {
    try {
      const { user_id } = params;
      const user = await this.userRepository.findById(user_id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update() {}

  remove() {}
}
