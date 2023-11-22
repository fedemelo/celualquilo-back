import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { PhoneReviewService } from './phone-review.service';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from 'src/review/review.dto';
import { ReviewEntity } from 'src/review/review.entity';


@Controller('phones')
@UseInterceptors(BusinessErrorsInterceptor)
export class PhoneReviewController {
    constructor(private readonly phoneReviewService: PhoneReviewService) { }

    @Post(':phoneId/reviews/:reviewId')
    async addReviewPhone(@Param('phoneId') phoneId: string, @Param('reviewId') reviewId: string){
        return await this.phoneReviewService.addReviewPhone(phoneId, reviewId);
    }

    @Get(':phoneId/reviews/:reviewId')
     async findReviewByPhoneIdReviewId(@Param('phoneId') phoneId: string, @Param('reviewId') reviewId: string){
          return await this.phoneReviewService.findReviewByPhoneIdReviewId(phoneId, reviewId);
     }

     @Get(':phoneId/reviews')
     async findReviewsByPhoneId(@Param('phoneId') phoneId: string){
          return await this.phoneReviewService.findReviewsByPhoneId(phoneId);
     }

     @Put(':phoneId/reviews')
     async associateReviewsPhone(@Body() reviewsDto: ReviewDto[] , @Param('phoneId') phoneId: string){
         const reviews = plainToInstance(ReviewEntity, reviewsDto)
         return await this.phoneReviewService.associateReviewsPhone(phoneId, reviews);
     }

     @Delete(':phoneId/reviews/:reviewId')
     @HttpCode(204)
     async deleteReviewPhone(@Param('phoneId') phoneId: string, @Param('reviewId') reviewId: string){
         return await this.phoneReviewService.deleteReviewPhone(phoneId, reviewId);
     }
}
