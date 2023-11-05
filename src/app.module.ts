import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhoneModule } from './phone/phone.module';
import { BrandModule } from './brand/brand.module';
import { RentModule } from './rent/rent.module';

@Module({
  imports: [PhoneModule, BrandModule, RentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
