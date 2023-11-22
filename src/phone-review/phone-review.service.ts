import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from '../phone/phone.entity';
import { ReviewEntity } from '../review/review.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PhoneReviewService {

    constructor(
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,

        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>
    ) {}

    async addReviewPhone(phoneId: string, reviewId: string): Promise<PhoneEntity> {
        const review: ReviewEntity = await this.reviewRepository.findOne({where: {id: reviewId}});
        if (!review)
          throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND);
      
        const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["reviews"]})
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);
    
        phone.reviews = [...phone.reviews, review];
        return await this.phoneRepository.save(phone);
    }

    async findReviewByPhoneIdReviewId(phoneId: string, reviewId: string): Promise<ReviewEntity> {
        const review: ReviewEntity = await this.reviewRepository.findOne({where: {id: reviewId}});
        if (!review)
          throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND)
       
        const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["reviews"]});
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND)
   
        const phoneReview: ReviewEntity = phone.reviews.find(e => e.id === review.id);
   
        if (!phoneReview)
          throw new BusinessLogicException("The review with the given id is not associated to the phone", BusinessError.PRECONDITION_FAILED)
   
        return phoneReview;
    }

    async findReviewsByPhoneId(phoneId: string): Promise<ReviewEntity[]> {
        const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["reviews"]});
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND)
       
        return phone.reviews;
    }

    async associateReviewsPhone(phoneId: string, reviews: ReviewEntity[]): Promise<PhoneEntity> {
        const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["reviews"]});
    
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND)

        for (let i=0; i<reviews.length; i++) {
            const review: ReviewEntity = await this.reviewRepository.findOne({where: {id: reviews[i].id}});
            if (!review)
                throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        phone.reviews = reviews;
        return await this.phoneRepository.save(phone);
    }

    async deleteReviewPhone(phoneId: string, reviewId: string): Promise<PhoneEntity> {
        const review: ReviewEntity = await this.reviewRepository.findOne({where: {id: reviewId}});
        if (!review)
          throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND);
      
        const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["reviews"]})
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);

        const phoneReview: ReviewEntity = phone.reviews.find(e => e.id === review.id);
        if (!phoneReview)
            throw new BusinessLogicException("The review with the given id is not associated to the phone", BusinessError.PRECONDITION_FAILED)
    
        phone.reviews = phone.reviews.filter(e => e.id !== review.id);
        return await this.phoneRepository.save(phone);
    }

}
