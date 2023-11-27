import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthController } from './user-auth.controller';

@Module({
  providers: [UserAuthService, AuthService, JwtService],
  controllers: [UserAuthController]
})
export class UserAuthModule {}
