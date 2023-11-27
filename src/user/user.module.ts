import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { RoleGuard } from '../user-auth/role.guard';

@Module({
  providers: [UserService, RoleGuard],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
})
export class UserModule {}
