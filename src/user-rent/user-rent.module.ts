import { Module } from '@nestjs/common';
import { UserRentService } from './user-rent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RentEntity } from 'src/rent/rent.entity';
import { UserRentController } from './user-rent.controller';

@Module({
  providers: [UserRentService], 
  imports: [TypeOrmModule.forFeature([UserEntity, RentEntity])], controllers: [UserRentController],
})
export class UserRentModule {}
