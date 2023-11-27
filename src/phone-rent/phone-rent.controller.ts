import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RentDto } from '../rent/rent.dto';
import { RentEntity } from '../rent/rent.entity';
import { PhoneRentService } from './phone-rent.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../user-auth/role.guard';
import { Roles } from '../user-auth/roles.decorator';

@Controller('phones')
@UseInterceptors(BusinessErrorsInterceptor)
export class PhoneRentController {
    constructor(private readonly phoneRentService: PhoneRentService) { }
 
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone-rent', 'writer')
    @Post(':phoneId/rents/:rentId')
    async addRentPhone(@Param('phoneId') phoneId: string, @Param('rentId') rentId: string){
        return await this.phoneRentService.addRentPhone(phoneId, rentId);
    }
 
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone-rent', 'reader')
    @Get(':phoneId/rents/:rentId')
     async findRentByPhoneIdRentId(@Param('phoneId') phoneId: string, @Param('rentId') rentId: string){
          return await this.phoneRentService.findRentByPhoneIdRentId(phoneId, rentId);
     }
 
     @UseGuards(JwtAuthGuard, RoleGuard)
     @Roles('admin', 'phone-rent', 'reader')
     @Get(':phoneId/rents')
     async findRentsByPhoneId(@Param('phoneId') phoneId: string){
          return await this.phoneRentService.findRentsByPhoneId(phoneId);
     }
 
     @UseGuards(JwtAuthGuard, RoleGuard)
     @Roles('admin', 'phone-rent', 'writer')
     @Put(':phoneId/rents')
     async associateRentsPhone(@Body() rentsDto: RentDto[] , @Param('phoneId') phoneId: string){
         const rents = plainToInstance(RentEntity, rentsDto)
         return await this.phoneRentService.associateRentsPhone(phoneId, rents);
     }
 
     @UseGuards(JwtAuthGuard, RoleGuard)
     @Roles('admin', 'phone-rent', 'deleter')
     @Delete(':phoneId/rents/:rentId')
     @HttpCode(204)
     async deleteRentPhone(@Param('phoneId') phoneId: string, @Param('rentId') rentId: string){
         return await this.phoneRentService.deleteRentPhone(phoneId, rentId);
     }
 
 
 }
 
