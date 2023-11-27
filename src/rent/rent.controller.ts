import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { RentDto } from './rent.dto';
import { RentEntity } from './rent.entity';
import { RentService } from './rent.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../user-auth/role.guard';
import { Roles } from '../user-auth/roles.decorator';

@Controller('rents')
@UseInterceptors(BusinessErrorsInterceptor)
export class RentController {
    constructor(private readonly rentService: RentService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'rent', 'reader')
    @Get('/:rentId')
    async findOne(@Param('rentId') rentId: string) {
        return await this.rentService.findOne(rentId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'rent', 'reader')
    @Get()
    async findAll() {
        return await this.rentService.findAll();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'rent', 'writer')
    @Post()
    async create(@Body() rentDto: RentDto) {
        const rent: RentEntity = plainToInstance(RentEntity, rentDto);
        return await this.rentService.create(rent);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'rent', 'writer')
    @Put('/:rentId')
    async update(@Param('rentId') rentId: string, @Body() rentDto: RentDto) {
        const rent: RentEntity = plainToInstance(RentEntity, rentDto);
        return await this.rentService.update(rentId, rent);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'rent', 'deleter')
    @Delete('/:rentId')
    @HttpCode(204)
    async delete(@Param('rentId') rentId: string) {
        return await this.rentService.delete(rentId);
    }
}
