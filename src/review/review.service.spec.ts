import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReviewEntity } from './review.entity';
import { ReviewService } from './review.service';
import { faker } from '@faker-js/faker';

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: Repository<ReviewEntity>;
  let reviewList: ReviewEntity[];

  const REVIEW_NOT_FOUND: string = "The review with the given id was not found";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReviewService],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    repository = module.get<Repository<ReviewEntity>>(getRepositoryToken(ReviewEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    reviewList = [];

    for (let i = 0; i < 5; i++) {
      const review = await repository.save({
        text: faker.lorem.words(10),
        rating: faker.number.int(5),
      });
      reviewList.push(review);
    }
  }

  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all reviews', async () => {
    const reviews = await service.findAll();
    expect(reviews).not.toBeNull();
    expect(reviews).toHaveLength(reviewList.length);
  });

    it('findAll should return an empty array', async () => {
        await repository.clear();
        const reviews = await service.findAll();
        expect(reviews).not.toBeNull();
        expect(reviews).toHaveLength(0);
    });

  it('findOne should return a review by id', async () => {
    const storedReview = reviewList[0];
    const review = await service.findOne(storedReview.id);
    expect(review).not.toBeNull();
    expect(review.text).toEqual(storedReview.text);
    expect(review.rating).toEqual(storedReview.rating);
  });

  it('findOne should throw an exception if the review does not exist', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", REVIEW_NOT_FOUND)
  });

  it('create should create a new review', async () => {
    const review: ReviewEntity = {
      id:"",
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
      phone:null,
      user:null
    };

    const newReview:ReviewEntity = await service.create(review);
    expect(newReview).not.toBeNull();

    const storedReview = await repository.findOne({where:{id:newReview.id}});
    expect(storedReview).not.toBeNull();
    expect(storedReview.text).toEqual(review.text);
    expect(storedReview.rating).toEqual(review.rating);

  });

  it('update should update an existing review', async () => {
    const storedReview = reviewList[0];
    storedReview.text = faker.lorem.words(10);
    storedReview.rating = faker.number.int(5);

    const updatedReview:ReviewEntity = await service.update(storedReview.id, storedReview);
    expect(updatedReview).not.toBeNull();

    const storedUpdatedReview = await repository.findOne({where:{id:storedReview.id}});
    expect(storedUpdatedReview).not.toBeNull();
    expect(storedUpdatedReview.text).toEqual(storedReview.text);
    expect(storedUpdatedReview.rating).toEqual(storedReview.rating);
  });

  it('update should throw an exception if the review does not exist', async () => {
    const review: ReviewEntity = {
      id:"0",
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
      phone:null,
      user:null
    };

    await expect(() => service.update(review.id, review)).rejects.toHaveProperty("message", REVIEW_NOT_FOUND)
  });

  it('delete should delete an existing review', async () => {
    const storedReview = reviewList[0];
    await service.delete(storedReview.id);

    const deletedReview = await repository.findOne({where:{id:storedReview.id}});
    expect(deletedReview).toBeNull();
  });

  it('delete should throw an exception if the review does not exist', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", REVIEW_NOT_FOUND)
  });

});
