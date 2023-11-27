import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { UserRentService } from './user-rent.service';
  import { RentEntity } from '../rent/rent.entity';
  import { plainToInstance } from 'class-transformer';
  import { RentDto } from '../rent/rent.dto';
  import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RoleGuard } from '../user-auth/role.guard'; 
  import { Roles } from '../user-auth/roles.decorator'; 

  @Controller('users')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class UserRentController {
    constructor(
      private readonly userRentService: UserRentService,
    ) {}
  
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'user-rent', 'writer')
    @Post(':userId/rents/:rentId')
    async addRentUser(
      @Param('userId') userId: string,
      @Param('rentId') rentId: string,
    ) {
      return await this.userRentService.addRentUser(
        userId,
        rentId,
      );
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'user-rent', 'reader')
    @Get(':userId/rents/:rentId')
    async findRentByUserIdRentId(
      @Param('userId') userId: string,
      @Param('rentId') rentId: string,
    ) {
      return await this.userRentService.findRentByUserIdRentId(
        userId,
        rentId,
      );
    }
  
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'user-rent', 'reader')
    @Get(':userId/rents')
    async findRentsByUserId(
      @Param('userId') userId: string,
    ) {
      return await this.userRentService.findRentsByUserId(
        userId,
      );
    }
  
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'user-rent', 'writer')
    @Put(':userId/rents')
    async associateRentsUser(
      @Body() rentsDto: RentDto[],
      @Param('userId') userId: string,
    ) {
      const rents = plainToInstance(RentEntity, rentsDto);
      return await this.userRentService.associateRentsUser(
        userId,
        rents,
      );
    }
  
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'user-rent', 'deleter')
    @Delete(':userId/rents/:rentId')
    @HttpCode(204)
    async deleteRentUser(
      @Param('userId') userId: string,
      @Param('rentId') rentId: string,
    ) {
      return await this.userRentService.deleteRentUser(
        userId,
        rentId,
      );
    }
  }