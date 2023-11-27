import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { ReviewController } from './review.controller';
import { RoleGuard } from 'src/user-auth/role.guard';

@Module({
  providers: [ReviewService, RoleGuard],
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [ReviewController],
})
export class ReviewModule {}
