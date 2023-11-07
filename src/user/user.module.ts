import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
