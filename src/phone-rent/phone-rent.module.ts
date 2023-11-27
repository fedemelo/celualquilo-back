import { Module } from '@nestjs/common';
import { PhoneRentService } from './phone-rent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from '../phone/phone.entity';
import { RentEntity } from '../rent/rent.entity';
import { PhoneRentController } from './phone-rent.controller';
import { RoleGuard } from 'src/user-auth/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity, RentEntity])],
  providers: [PhoneRentService, RoleGuard],
  controllers: [PhoneRentController]
})
export class PhoneRentModule {}
