import { Module } from '@nestjs/common';
import { PhoneRentService } from './phone-rent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/phone/phone.entity';
import { RentEntity } from 'src/rent/rent.entity';
import { PhoneRentController } from './phone-rent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity, RentEntity])],
  providers: [PhoneRentService],
  controllers: [PhoneRentController]
})
export class PhoneRentModule {}
