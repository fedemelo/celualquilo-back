import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [UserModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
