import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { PhoneReviewService } from './phone-review.service';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from '../review/review.dto';
import { ReviewEntity } from '../review/review.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../user-auth/role.guard';
import { Roles } from '../user-auth/roles.decorator';


@Controller('phones')
@UseInterceptors(BusinessErrorsInterceptor)
export class PhoneReviewController {
    constructor(private readonly phoneReviewService: PhoneReviewService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone-review', 'writer')
    @Post(':phoneId/reviews/:reviewId')
    async addReviewPhone(@Param('phoneId') phoneId: string, @Param('reviewId') reviewId: string){
        return await this.phoneReviewService.addReviewPhone(phoneId, reviewId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone-review', 'reader')
    @Get(':phoneId/reviews/:reviewId')
     async findReviewByPhoneIdReviewId(@Param('phoneId') phoneId: string, @Param('reviewId') reviewId: string){
          return await this.phoneReviewService.findReviewByPhoneIdReviewId(phoneId, reviewId);
     }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone-review', 'reader')
     @Get(':phoneId/reviews')
     async findReviewsByPhoneId(@Param('phoneId') phoneId: string){
          return await this.phoneReviewService.findReviewsByPhoneId(phoneId);
     }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone-review', 'writer')
    @Put(':phoneId/reviews')
    async associateReviewsPhone(@Body() reviewsDto: ReviewDto[] , @Param('phoneId') phoneId: string){
         const reviews = plainToInstance(ReviewEntity, reviewsDto)
         return await this.phoneReviewService.associateReviewsPhone(phoneId, reviews);
     }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'phone-review', 'deleter')
     @Delete(':phoneId/reviews/:reviewId')
     @HttpCode(204)
     async deleteReviewPhone(@Param('phoneId') phoneId: string, @Param('reviewId') reviewId: string){
         return await this.phoneReviewService.deleteReviewPhone(phoneId, reviewId);
     }
}
