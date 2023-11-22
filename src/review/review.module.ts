import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { ReviewController } from './review.controller';

@Module({
  providers: [ReviewService],
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [ReviewController],
})
export class ReviewModule {}
