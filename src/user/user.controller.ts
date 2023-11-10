import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return await this.userService.findOne(userId);
  }

  @Post()
  async create(@Body() userDto: UserDto) {
    const user: UserEntity = plainToInstance(UserEntity, userDto);
    const user1 = await this.userService.create(user);
    delete user1.password;
    return user1;
  }

  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() userDto: UserDto) {
    const user: UserEntity = plainToInstance(UserEntity, userDto);
    const user1 = await this.userService.update(userId, user);
    delete user1.password;
    return await user1;
  }

  @Delete(':userId')
  @HttpCode(204)
  async delete(@Param('userId') userId: string) {
    return await this.userService.delete(userId);
  }
}