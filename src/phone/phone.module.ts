/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './phone.entity';
import { PhoneController } from './phone.controller';

@Module({
  providers: [PhoneService],
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [PhoneController],
})
export class PhoneModule {}
