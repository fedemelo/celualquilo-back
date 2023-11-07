import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../../brand/brand.entity';
import { PhoneEntity } from '../../phone/phone.entity';
import { ReviewEntity } from '../../review/review.entity';
import { UserEntity } from '../../user/user.entity';
import { RentEntity } from '../../rent/rent.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [PhoneEntity, UserEntity, ReviewEntity, RentEntity, BrandEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([PhoneEntity, UserEntity, ReviewEntity, RentEntity, BrandEntity]),
];