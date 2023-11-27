import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthModule } from '../user-auth/user-auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import constants from '../shared/security/constants';
import { UserAuthService } from '../user-auth/user-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService, UserAuthService, JwtStrategy, LocalStrategy, JwtService],
  imports: [
    UserAuthModule,
    PassportModule,
    JwtModule.register({
      secret: constants.JWT_SECRET,
      signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
