import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { PhoneDto } from './phone.dto';
import { PhoneEntity } from './phone.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../user-auth/role.guard';
import { Roles } from '../user-auth/roles.decorator';


@Controller('phones')
@UseInterceptors(BusinessErrorsInterceptor)
export class PhoneController {
    constructor(private readonly phoneService: PhoneService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone', 'reader')
    @Get()
    async findAll() {
        return await this.phoneService.findAll();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone', 'reader')
    @Get(':phoneId')
    async findOne(@Param('phoneId') phoneId: string) {
        return await this.phoneService.findOne(phoneId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone', 'writer')
    @Post()
    async create(@Body() phoneDto: PhoneDto) {
        const phone: PhoneEntity = plainToInstance(PhoneEntity, phoneDto);
        return await this.phoneService.create(phone);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone', 'writer')
    @Put(':phoneId')
    async update(@Param('phoneId') phoneId: string, @Body() phoneDto: PhoneDto) {
        const phone: PhoneEntity = plainToInstance(PhoneEntity, phoneDto);
        return await this.phoneService.update(phoneId, phone);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone', 'deleter')
    @Delete(':phoneId')
    @HttpCode(204)
    async delete(@Param('phoneId') phoneId: string) {
        return await this.phoneService.delete(phoneId);
    }
    
}
