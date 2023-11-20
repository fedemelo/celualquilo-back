import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RentDto } from 'src/rent/rent.dto';
import { RentEntity } from 'src/rent/rent.entity';
import { PhoneRentService } from './phone-rent.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';

@Controller('phones')
@UseInterceptors(BusinessErrorsInterceptor)
export class PhoneRentController {
    constructor(private readonly phoneRentService: PhoneRentService) { }
 
    @Post(':phoneId/rents/:rentId')
    async addRentPhone(@Param('phoneId') phoneId: string, @Param('rentId') rentId: string){
        return await this.phoneRentService.addRentPhone(phoneId, rentId);
    }
 
    @Get(':phoneId/rents/:rentId')
     async findRentByPhoneIdRentId(@Param('phoneId') phoneId: string, @Param('rentId') rentId: string){
          return await this.phoneRentService.findRentByPhoneIdRentId(phoneId, rentId);
     }
 
     @Get(':phoneId/rents')
     async findRentsByPhoneId(@Param('phoneId') phoneId: string){
          return await this.phoneRentService.findRentsByPhoneId(phoneId);
     }
 
     @Put(':phoneId/rents')
     async associateRentsPhone(@Body() rentsDto: RentDto[] , @Param('phoneId') phoneId: string){
         const rents = plainToInstance(RentEntity, rentsDto)
         return await this.phoneRentService.associateRentsPhone(phoneId, rents);
     }
 
     @Delete(':phoneId/rents/:rentId')
     @HttpCode(204)
     async deleteRentPhone(@Param('phoneId') phoneId: string, @Param('rentId') rentId: string){
         return await this.phoneRentService.deleteRentPhone(phoneId, rentId);
     }
 
 
 }
 
