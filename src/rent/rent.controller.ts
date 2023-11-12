import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { RentDto } from './rent.dto';
import { RentEntity } from './rent.entity';
import { RentService } from './rent.service';

@Controller('rents')
@UseInterceptors(BusinessErrorsInterceptor)
export class RentController {
    constructor(private readonly rentService: RentService) { }

    @Get('/:rentId')
    async findOne(@Param('rentId') rentId: string) {
        return await this.rentService.findOne(rentId);
    }

    @Get()
    async findAll() {
        return await this.rentService.findAll();
    }

    @Post()
    async create(@Body() rentDto: RentDto) {
        const rent: RentEntity = plainToInstance(RentEntity, rentDto);
        return await this.rentService.create(rent);
    }

    @Put('/:rentId')
    async update(@Param('rentId') rentId: string, @Body() rentDto: RentDto) {
        const rent: RentEntity = plainToInstance(RentEntity, rentDto);
        return await this.rentService.update(rentId, rent);
    }

    @Delete('/:rentId')
    @HttpCode(204)
    async delete(@Param('rentId') rentId: string) {
        return await this.rentService.delete(rentId);
    }
}
