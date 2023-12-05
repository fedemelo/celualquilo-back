/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './phone.entity';
import { PhoneController } from './phone.controller';
import { RoleGuard } from 'src/user-auth/role.guard';
import { UserEntity } from 'src/user/user.entity';

@Module({
  providers: [PhoneService, RoleGuard],
  imports: [TypeOrmModule.forFeature([PhoneEntity, UserEntity])],
  controllers: [PhoneController],
})
export class PhoneModule {}
