import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [PhoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
