/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './phone.entity';
import { PhoneController } from './phone.controller';
import { RoleGuard } from 'src/user-auth/role.guard';

@Module({
  providers: [PhoneService, RoleGuard],
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [PhoneController],
})
export class PhoneModule {}
