import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { PhoneEntity } from 'src/phone/phone.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BrandEntity, PhoneEntity])],
    controllers: [BrandController],
    providers: [BrandService],
})
export class BrandModule { }
