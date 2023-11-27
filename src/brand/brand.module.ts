import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { PhoneEntity } from '../phone/phone.entity';
import { RoleGuard } from 'src/user-auth/role.guard';

@Module({
    imports: [TypeOrmModule.forFeature([BrandEntity, PhoneEntity])],
    controllers: [BrandController],
    providers: [BrandService, RoleGuard],
})
export class BrandModule { }
