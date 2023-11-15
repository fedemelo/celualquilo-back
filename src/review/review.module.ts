import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';

@Module({
  providers: [ReviewService],
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
})
export class ReviewModule {}
