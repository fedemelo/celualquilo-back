import { Test, TestingModule } from '@nestjs/testing';
import { PhoneReviewService } from './phone-review.service';
import { Repository } from 'typeorm';
import { PhoneEntity } from '../phone/phone.entity';
import { ReviewEntity } from '../review/review.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import exp from 'constants';

describe('PhoneReviewService', () => {
  let service: PhoneReviewService;
  let phoneRepository: Repository<PhoneEntity>;
  let reviewRepository: Repository<ReviewEntity>;
  let phone: PhoneEntity;
  let reviewList: ReviewEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PhoneReviewService],
    }).compile();

    service = module.get<PhoneReviewService>(PhoneReviewService);
    phoneRepository = module.get<Repository<PhoneEntity>>(getRepositoryToken(PhoneEntity));
    reviewRepository = module.get<Repository<ReviewEntity>>(getRepositoryToken(ReviewEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    phoneRepository.clear();
    reviewRepository.clear();

    reviewList = [];
    for (let i = 0; i < 5; i++) {
      const review: ReviewEntity = await reviewRepository.save({
        text: faker.lorem.words(10),
        rating: faker.number.int(5),
      });
      reviewList.push(review);
    }

    phone = await phoneRepository.save({
      name: faker.lorem.word(),
      pricePerDay: faker.commerce.price(),
      stock: faker.number.int(),
      cameraSpecs: faker.lorem.sentence(),
      memorySpecs: faker.lorem.sentence(),
      screenSpecs: faker.lorem.sentence(),
      isLastGeneration: faker.datatype.boolean(),
      isOnSale: faker.datatype.boolean(),
      image: faker.image.url(),
      reviews: reviewList,
    });

  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addReview should add a review to a phone', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
    });

    const newPhone: PhoneEntity = await phoneRepository.save({
      name: faker.lorem.word(),
      pricePerDay: faker.commerce.price(),
      stock: faker.number.int(),
      cameraSpecs: faker.lorem.sentence(),
      memorySpecs: faker.lorem.sentence(),
      screenSpecs: faker.lorem.sentence(),
      isLastGeneration: faker.datatype.boolean(),
      isOnSale: faker.datatype.boolean(),
      image: faker.image.url(),
    });

    const result: PhoneEntity = await service.addReviewPhone(newPhone.id, newReview.id);

    expect(result.reviews.length).toBe(1);
    expect(result.reviews[0]).not.toBeNull();
    expect(result.reviews[0].id).toBe(newReview.id);
    expect(result.reviews[0].text).toBe(newReview.text);

  });

  it('addReview should throw an exception if the review does not exist', async () => {
    const newPhone: PhoneEntity = await phoneRepository.save({
      name: faker.lorem.word(),
      pricePerDay: faker.commerce.price(),
      stock: faker.number.int(),
      cameraSpecs: faker.lorem.sentence(),
      memorySpecs: faker.lorem.sentence(),
      screenSpecs: faker.lorem.sentence(),
      isLastGeneration: faker.datatype.boolean(),
      isOnSale: faker.datatype.boolean(),
      image: faker.image.url(),
    });

    await expect(() => service.addReviewPhone(newPhone.id, "0")).rejects.toHaveProperty("message", "The review with the given id was not found");
  });

  it('addReview should throw an exception if the phone does not exist', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
    });

    await expect(() => service.addReviewPhone("0", newReview.id)).rejects.toHaveProperty("message", "The phone with the given id was not found");
  });

  it('findReviewsByPhoneIdReviewId should return reviews by phone', async () => {
    const review = reviewList[0];
    const storedReview = await service.findReviewByPhoneIdReviewId(phone.id, review.id);
    expect(storedReview).not.toBeNull();
    expect(storedReview.id).toEqual(review.id);
    expect(storedReview.text).toEqual(review.text);
    expect(storedReview.rating).toEqual(review.rating);
  });

  it('findReviewsByPhoneIdReviewId should throw an exception if the review does not exist', async () => {
    await expect(() => service.findReviewByPhoneIdReviewId(phone.id, "0")).rejects.toHaveProperty("message", "The review with the given id was not found");
  });

  it('findReviewsByPhoneIdReviewId should throw an exception if the phone does not exist', async () => {
    const review = reviewList[0];
    await expect(() => service.findReviewByPhoneIdReviewId("0", review.id)).rejects.toHaveProperty("message", "The phone with the given id was not found");
  });

  it('findReviewsByPhoneIdReviewId should throw an exception if the review does not belong to the phone', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
    });

    await expect(() => service.findReviewByPhoneIdReviewId(phone.id, newReview.id)).rejects.toHaveProperty("message", "The review with the given id is not associated to the phone");
  });

  it('findReviewsByPhoneId should return reviews by phone', async () => {
    const reviews = await service.findReviewsByPhoneId(phone.id);
    expect(reviews).not.toBeNull();
    expect(reviews).toHaveLength(reviewList.length);
  });

  it('findReviewsByPhoneId should throw an exception if the phone does not exist', async () => {
    await expect(() => service.findReviewsByPhoneId("0")).rejects.toHaveProperty("message", "The phone with the given id was not found");
  });

  it('asoociateReviewToPhone should associate a review to a phone', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
    });

    const result: PhoneEntity = await service.associateReviewsPhone(phone.id, [newReview]);

    expect(result.reviews.length).toBe(1);
    expect(result.reviews[0]).not.toBeNull();
    expect(result.reviews[0].id).toBe(newReview.id);
    expect(result.reviews[0].text).toBe(newReview.text);
  });

  it('asoociateReviewToPhone should throw an exception if the phone does not exist', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
    });

    await expect(() => service.associateReviewsPhone("0", [newReview])).rejects.toHaveProperty("message", "The phone with the given id was not found");
  });

  it('asoociateReviewToPhone should throw an exception if the review does not exist', async () => {
    const newReview: ReviewEntity = reviewList[0];
    newReview.id = "0";

    await expect(() => service.associateReviewsPhone(phone.id, [newReview])).rejects.toHaveProperty("message", "The review with the given id was not found");
  });

  it('deleteReviewPhone should delete a review from a phone', async () => {
    const review = reviewList[0];
    await service.deleteReviewPhone(phone.id, review.id);

    const storedPhone = await phoneRepository.findOne({ where: { id: phone.id }, relations: ["reviews"] });
    const deletedReview = storedPhone.reviews.find(e => e.id === review.id);

    expect(deletedReview).toBeUndefined();
  });

  it('deleteReviewPhone should throw an exception if the phone does not exist', async () => {
    const review = reviewList[0];
    await expect(() => service.deleteReviewPhone("0", review.id)).rejects.toHaveProperty("message", "The phone with the given id was not found");
  });

  it('deleteReviewPhone should throw an exception if the review does not exist', async () => {
    await expect(() => service.deleteReviewPhone(phone.id, "0")).rejects.toHaveProperty("message", "The review with the given id was not found");
  });

  it('deleteReviewPhone should throw an exception if the review does not belong to the phone', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      text: faker.lorem.words(10),
      rating: faker.number.int(5),
    });

    await expect(() => service.deleteReviewPhone(phone.id, newReview.id)).rejects.toHaveProperty("message", "The review with the given id is not associated to the phone");
  });
  
});
