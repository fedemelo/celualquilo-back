import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReviewService } from './review.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ReviewEntity } from './review.entity';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from './review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../user-auth/role.guard';
import { Roles } from '../user-auth/roles.decorator';
import { v4 as uuidv4 } from 'uuid';

@Controller('reviews')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'review', 'reader')
    @Get()
    async findAll() {
        return await this.reviewService.findAll();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'review', 'reader')
    @Get('/:reviewId')
    async findOne(@Param('reviewId') reviewId: string) {
        return await this.reviewService.findOne(reviewId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'review', 'writer')
    @Post()
    async create(@Body() reviewDto: any) {
        reviewDto.id = uuidv4();
        const review:ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
        return await this.reviewService.create(review);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'review', 'writer')
    @Put('/:reviewId')
    async update(@Param('reviewId') reviewId: string, @Body() reviewDto: ReviewDto) {
        const review:ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
        return await this.reviewService.update(reviewId, review);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('admin', 'review', 'deleter')
    @Delete('/:reviewId')
    @HttpCode(204)
    async delete(@Param('reviewId') reviewId: string) {
        return await this.reviewService.delete(reviewId);
    }
}
