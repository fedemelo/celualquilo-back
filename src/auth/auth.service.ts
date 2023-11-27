/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from '../user-auth/user-auth';
import { UserAuthService } from '../user-auth/user-auth.service';
import constants from '../shared/security/constants';

@Injectable()
export class AuthService {
   constructor(
       private usersService: UserAuthService,
       private jwtService: JwtService
   ) {}

   async validateUser(username: string, password: string): Promise<any> {
       const user: UserAuth = await this.usersService.findOne(username);
       if (user && user.password === password) {
           const { password, ...result } = user;
           return result;
       }
       return null;
   }

   async login(req: any) {
    const payload = {
      username: req.user.username,
      sub: req.user.id,
      roles: req.user.roles,
    };
    return {
      token: this.jwtService.sign(payload, {
        privateKey: constants.JWT_SECRET,
      }),
    };
  }

}