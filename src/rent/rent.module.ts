import { Module } from '@nestjs/common';

import { RentController } from './rent.controller';
import { RentService } from './rent.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from './rent.entity';
import { PhoneEntity } from '../phone/phone.entity';
import { UserEntity } from '../user/user.entity';
import { RoleGuard } from 'src/user-auth/role.guard';

@Module({
    imports: [TypeOrmModule.forFeature([RentEntity, PhoneEntity, UserEntity])],
    controllers: [RentController],
    providers: [RentService, RoleGuard],
})
export class RentModule { }
