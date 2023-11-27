import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { BrandDto } from './brand.dto';
import { BrandEntity } from './brand.entity';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../user-auth/role.guard';
import { Roles } from '../user-auth/roles.decorator';

@Controller('brands')
@UseInterceptors(BusinessErrorsInterceptor)
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'brand', 'reader')
    @Get()
    async findAll() {
        return await this.brandService.findAll();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'brand', 'reader')
    @Get(':brandId')
    async findOne(@Param('brandId') brandId: string) {
        return await this.brandService.findOne(brandId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'brand', 'writer')
    @Post()
    async create(@Body() brandDto: BrandDto) {
        const brand = plainToInstance(BrandEntity, brandDto)
        return await this.brandService.create(brand);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'brand', 'writer')
    @Put(':brandId')
    async update(@Param('brandId') brandId: string, @Body() brandDto: BrandDto) {
        const brand = plainToInstance(BrandEntity, brandDto)
        return await this.brandService.update(brandId, brand);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'brand', 'deleter')
    @Delete(':brandId')
    @HttpCode(204)
    async delete(@Param('brandId') brandId: string) {
        return await this.brandService.delete(brandId);
    }
}
