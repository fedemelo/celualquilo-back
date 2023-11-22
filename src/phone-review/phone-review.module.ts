import { Module } from '@nestjs/common';
import { PhoneReviewService } from './phone-review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from '../phone/phone.entity';
import { ReviewEntity } from '../review/review.entity';
import { PhoneReviewController } from './phone-review.controller';

@Module({
  providers: [PhoneReviewService],
  imports: [TypeOrmModule.forFeature([PhoneEntity, ReviewEntity])],
  controllers: [PhoneReviewController],
})
export class PhoneReviewModule {}
