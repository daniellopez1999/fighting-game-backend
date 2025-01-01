import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './auth.service';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfirmPasswordDto } from './dto/confirm-password.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param() params: FindUserDto) {
    return await this.usersService.findOne(params);
  }

  @Post()
  async createrUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('confirm-password')
  async confirmPassword(@Body() confirmPasswordDto: ConfirmPasswordDto) {
    return await this.usersService.confirmPassword(confirmPasswordDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }
}
