import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { PhoneDto } from './phone.dto';
import { PhoneEntity } from './phone.entity';
import { plainToInstance } from 'class-transformer';

@Controller('phones')
@UseInterceptors(BusinessErrorsInterceptor)
export class PhoneController {
    constructor(private readonly phoneService: PhoneService) { }

    @Get()
    async findAll() {
        return await this.phoneService.findAll();
    }

    @Get(':phoneId')
    async findOne(@Param('phoneId') phoneId: string) {
        return await this.phoneService.findOne(phoneId);
    }

    @Post()
    async create(@Body() phoneDto: PhoneDto) {
        const phone: PhoneEntity = plainToInstance(PhoneEntity, phoneDto);
        return await this.phoneService.create(phone);
    }

    @Put(':phoneId')
    async update(@Param('phoneId') phoneId: string, @Body() phoneDto: PhoneDto) {
        const phone: PhoneEntity = plainToInstance(PhoneEntity, phoneDto);
        return await this.phoneService.update(phoneId, phone);
    }

    @Delete(':phoneId')
    @HttpCode(204)
    async delete(@Param('phoneId') phoneId: string) {
        return await this.phoneService.delete(phoneId);
    }
    
}
