import { Test, TestingModule } from '@nestjs/testing';
import { RentEntity } from '../rent/rent.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UserRentService } from './user-rent.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('UserRentService', () => {
  let service: UserRentService;
  let userRepository: Repository<UserEntity>;
  let rentRepository: Repository<RentEntity>;
  let user: UserEntity;
  let rentsList : RentEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UserRentService],
    }).compile();

    service = module.get<UserRentService>(UserRentService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    rentRepository = module.get<Repository<RentEntity>>(getRepositoryToken(RentEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    rentRepository.clear();
    userRepository.clear();

    rentsList = [];
    for(let i = 0; i < 5; i++){
        const rent: RentEntity = await rentRepository.save({
          isActive: true,
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          paymentMethod: "Credit Card",
          address: faker.lorem.sentence(),
          city: faker.lorem.word(),
          telephoneNumber: "1234567891",
        })
        rentsList.push(rent);
    }

    user = await userRepository.save({
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      rents: rentsList,
      favorites: [],
      reviews: []
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addRentUser should add an rent to a user', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: true,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: "Credit Card",
      address: faker.lorem.sentence(),
      city: faker.lorem.word(),
      telephoneNumber: "1234567891",
    });

    const newUser: UserEntity = await userRepository.save({
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const result: UserEntity = await service.addRentUser(newUser.id, newRent.id);
    
    expect(result.rents.length).toBe(1);
    expect(result.rents[0]).not.toBeNull();
    expect(result.rents[0].id).toBe(newRent.id);
    expect(result.rents[0].isActive).toBe(newRent.isActive);
    expect(result.rents[0].startDate).toStrictEqual(newRent.startDate);
    expect(result.rents[0].endDate).toStrictEqual(newRent.endDate);
    expect(result.rents[0].paymentMethod).toBe(newRent.paymentMethod);
    expect(result.rents[0].address).toBe(newRent.address);
    expect(result.rents[0].city).toBe(newRent.city);
    expect(result.rents[0].telephoneNumber).toBe(newRent.telephoneNumber);
  });

  it('addRentUser should thrown exception for an invalid rent', async () => {
    const newUser: UserEntity = await userRepository.save({
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    await expect(() => service.addRentUser(newUser.id, "0")).rejects.toHaveProperty("message", "The rent with the given id was not found");
  });

  it('addRentUser should throw an exception for an invalid user', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: true,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: "Credit Card",
      address: faker.lorem.sentence(),
      city: faker.lorem.word(),
      telephoneNumber: "1234567891",
    });

    await expect(() => service.addRentUser("0", newRent.id)).rejects.toHaveProperty("message", "The user with the given id was not found");
  });

  it('findRentByUserIdRentId should return rent by user', async () => {
    const rent: RentEntity = rentsList[0];
    const storedRent: RentEntity = await service.findRentByUserIdRentId(user.id, rent.id, )
    expect(storedRent).not.toBeNull();
    expect(storedRent.id).toBe(rent.id);
    expect(storedRent.isActive).toBe(rent.isActive);
    expect(storedRent.startDate).toStrictEqual(rent.startDate);
    expect(storedRent.endDate).toStrictEqual(rent.endDate);
    expect(storedRent.paymentMethod).toBe(rent.paymentMethod);
    expect(storedRent.address).toBe(rent.address);
    expect(storedRent.city).toBe(rent.city);
    expect(storedRent.telephoneNumber).toBe(rent.telephoneNumber);
  });

  it('findRentByUserIdRentId should throw an exception for an invalid rent', async () => {
    await expect(()=> service.findRentByUserIdRentId(user.id, "0")).rejects.toHaveProperty("message", "The rent with the given id was not found"); 
  });

  it('findRentByUserIdRentId should throw an exception for an invalid user', async () => {
    const rent: RentEntity = rentsList[0]; 
    await expect(()=> service.findRentByUserIdRentId("0", rent.id)).rejects.toHaveProperty("message", "The user with the given id was not found"); 
  });

  it('findRentByUserIdRentId should throw an exception for an rent not associated to the user', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: true,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: "Credit Card",
      address: faker.lorem.sentence(),
      city: faker.lorem.word(),
      telephoneNumber: "1234567891",
    });

    await expect(()=> service.findRentByUserIdRentId(user.id, newRent.id)).rejects.toHaveProperty("message", "The rent with the given id is not associated to the user"); 
  });

  it('findRentsByUserId should return rents by user', async ()=>{
    const rents: RentEntity[] = await service.findRentsByUserId(user.id);
    expect(rents.length).toBe(5)
  });

  it('findRentsByUserId should throw an exception for an invalid user', async () => {
    await expect(()=> service.findRentsByUserId("0")).rejects.toHaveProperty("message", "The user with the given id was not found"); 
  });

  it('associateRentsUser should update rents list for a user', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: true,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: "Credit Card",
      address: faker.lorem.sentence(),
      city: faker.lorem.word(),
      telephoneNumber: "1234567891",
    });

    const updatedUser: UserEntity = await service.associateRentsUser(user.id, [newRent]);
    expect(updatedUser.rents.length).toBe(1);
    expect(updatedUser.rents[0]).not.toBeNull();
    expect(updatedUser.rents[0].id).toBe(newRent.id); 
    expect(updatedUser.rents[0].isActive).toBe(newRent.isActive);
    expect(updatedUser.rents[0].startDate).toBe(newRent.startDate);
    expect(updatedUser.rents[0].endDate).toBe(newRent.endDate);
    expect(updatedUser.rents[0].paymentMethod).toBe(newRent.paymentMethod);
    expect(updatedUser.rents[0].address).toBe(newRent.address);
    expect(updatedUser.rents[0].city).toBe(newRent.city);
    expect(updatedUser.rents[0].telephoneNumber).toBe(newRent.telephoneNumber);
  });

  it('associateRentsUser should throw an exception for an invalid user', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: true,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: "Credit Card",
      address: faker.lorem.sentence(),
      city: faker.lorem.word(),
      telephoneNumber: "1234567891",
    });

    await expect(()=> service.associateRentsUser("0", [newRent])).rejects.toHaveProperty("message", "The user with the given id was not found"); 
  });

  it('associateRentsUser should throw an exception for an invalid rent', async () => {
    const newRent: RentEntity = rentsList[0];
    newRent.id = "0";

    await expect(()=> service.associateRentsUser(user.id, [newRent])).rejects.toHaveProperty("message", "The rent with the given id was not found"); 
  });

  it('deleteRentToUser should remove an rent from a user', async () => {
    const rent: RentEntity = rentsList[0];
    
    await service.deleteRentUser(user.id, rent.id);

    const storedUser: UserEntity = await userRepository.findOne({where: {id: user.id}, relations: ["rents"]});
    const deletedRent: RentEntity = storedUser.rents.find(a => a.id === rent.id);

    expect(deletedRent).toBeUndefined();

  });

  it('deleteRentToUser should thrown an exception for an invalid rent', async () => {
    await expect(()=> service.deleteRentUser(user.id, "0")).rejects.toHaveProperty("message", "The rent with the given id was not found"); 
  });

  it('deleteRentToUser should thrown an exception for an invalid user', async () => {
    const rent: RentEntity = rentsList[0];
    await expect(()=> service.deleteRentUser("0", rent.id)).rejects.toHaveProperty("message", "The user with the given id was not found"); 
  });

  it('deleteRentToUser should thrown an exception for an non asocciated rent', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: true,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: "Credit Card",
      address: faker.lorem.sentence(),
      city: faker.lorem.word(),
      telephoneNumber: "1234567891",
    });

    await expect(()=> service.deleteRentUser(user.id, newRent.id)).rejects.toHaveProperty("message", "The rent with the given id is not associated to the user"); 
  }); 

});