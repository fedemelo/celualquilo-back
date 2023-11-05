import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { BrandDto } from './brand.dto';
import { BrandEntity } from './brand.entity';
import { BrandService } from './brand.service';

@Controller('brands')
@UseInterceptors(BusinessErrorsInterceptor)
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @Get()
    async findAll() {
        return await this.brandService.findAll();
    }

    @Get(':brandId')
    async findOne(@Param('brandId') brandId: number) {
        return await this.brandService.findOne(brandId);
    }

    @Post()
    async create(@Body() brandDto: BrandDto) {
        const brand = plainToInstance(BrandEntity, brandDto)
        return await this.brandService.create(brand);
    }

    @Put(':brandId')
    async update(@Param('brandId') brandId: number, @Body() brandDto: BrandDto) {
        const brand = plainToInstance(BrandEntity, brandDto)
        return await this.brandService.update(brandId, brand);
    }

    @Delete(':brandId')
    @HttpCode(204)
    async delete(@Param('brandId') brandId: number) {
        return await this.brandService.delete(brandId);
    }
}
