import { Module } from '@nestjs/common';
import { UserRentService } from './user-rent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { RentEntity } from '../rent/rent.entity';
import { UserRentController } from './user-rent.controller';
import { RoleGuard } from 'src/user-auth/role.guard';

@Module({
  providers: [UserRentService, RoleGuard ], 
  imports: [TypeOrmModule.forFeature([UserEntity, RentEntity])], controllers: [UserRentController],
})
export class UserRentModule {}
