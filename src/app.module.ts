import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhoneModule } from './phone/phone.module';
import { BrandModule } from './brand/brand.module';
import { RentModule } from './rent/rent.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './phone/phone.entity';
import { BrandEntity } from './brand/brand.entity';
import { RentEntity } from './rent/rent.entity';
import { ReviewEntity } from './review/review.entity';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [PhoneModule, BrandModule, RentModule,ReviewModule,UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'celualquilo',
      entities: [PhoneEntity,BrandEntity,RentEntity,ReviewEntity,UserEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
