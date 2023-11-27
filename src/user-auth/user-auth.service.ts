import { Injectable } from '@nestjs/common';
import { UserAuth } from './user-auth';


@Injectable()
export class UserAuthService {
    private users: UserAuth[] = [
        new UserAuth(1, "admin", "admin", ["admin"]),
        new UserAuth(2, "reader", "reader", ["reader"]),
        new UserAuth(3, "writer", "writer", ["writer"]),
        new UserAuth(4, "deleter", "deleter", ["deleter"]),
        new UserAuth(5, "brand", "brand", ["brand"]),
        new UserAuth(6, "phone", "phone", ["phone"]),
        new UserAuth(7, "phone-rent", "phone-rent", ["phone-rent"]),
        new UserAuth(8, "phone-review", "phone-review", ["phone-review"]),
        new UserAuth(9, "rent", "rent", ["rent"]),
        new UserAuth(10, "review", "review", ["review"]),
        new UserAuth(11, "user", "user", ["user"]),
        new UserAuth(12, "user-rent", "user-rent", ["user-rent"]),
    ];
 
    async findOne(username: string): Promise<UserAuth | undefined> {
        return this.users.find(user => user.username === username);
    }
}
