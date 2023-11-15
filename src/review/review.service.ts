import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ReviewEntity } from './review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {

    REVIEW_NOT_FOUND: string = "The review with the given id was not found";

    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
    ) { }

    async findAll(): Promise<ReviewEntity[]> {
        return await this.reviewRepository.find({ relations: ["phone"] });
    }

    async findOne(reviewId: string): Promise<ReviewEntity> {
        const review =  await this.reviewRepository.findOne({ where: { id: reviewId }, relations: ["phone"] });
        if (!review)
            throw new BusinessLogicException(this.REVIEW_NOT_FOUND, BusinessError.NOT_FOUND)

        return review;
    }

    async create(reviewEntity: ReviewEntity): Promise<ReviewEntity> {
        return await this.reviewRepository.save(reviewEntity);
    }

    async update(reviewId: string, reviewEntity: ReviewEntity): Promise<ReviewEntity> {
        const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
        if (!review)
            throw new BusinessLogicException(this.REVIEW_NOT_FOUND, BusinessError.NOT_FOUND)

        return await this.reviewRepository.save({ ...review, ...reviewEntity });
    }

    async delete(reviewId: string) {
        const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
        if (!review)
            throw new BusinessLogicException(this.REVIEW_NOT_FOUND, BusinessError.NOT_FOUND)

        return await this.reviewRepository.remove(review);
    }
}
