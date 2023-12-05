import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PhoneEntity } from './phone.entity';
import { PhoneService } from './phone.service';

import { faker } from '@faker-js/faker';
import { UserEntity } from '../user/user.entity';

describe('PhoneService', () => {
  let service: PhoneService;
  let repository: Repository<PhoneEntity>;
  let userRepository: Repository<UserEntity>;
  let phonesList: PhoneEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PhoneService],
    }).compile();

    service = module.get<PhoneService>(PhoneService);
    repository = module.get<Repository<PhoneEntity>>(getRepositoryToken(PhoneEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    phonesList = [];
    for (let i = 0; i < 5; i++) {
      const phone: PhoneEntity = await repository.save({
        name: faker.lorem.word(),
        pricePerDay: faker.commerce.price(),
        stock: faker.number.int(),
        cameraSpecs: faker.lorem.sentence(),
        memorySpecs: faker.lorem.sentence(),
        screenSpecs: faker.lorem.sentence(),
        isLastGeneration: faker.datatype.boolean(),
        isOnSale: faker.datatype.boolean(),
        image: faker.image.url(),
      })
      phonesList.push(phone);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all phones', async () => {
    const phones: PhoneEntity[] = await service.findAll();
    expect(phones).not.toBeNull();
    expect(phones).toHaveLength(phonesList.length);
  });

  it('findAll should return an empty array', async () => {
    await repository.clear();
    const phones: PhoneEntity[] = await service.findAll();
    expect(phones).not.toBeNull();
    expect(phones).toHaveLength(0);
  });

  it('findOne should return a phone by id', async () => {
    const storedPhone: PhoneEntity = phonesList[0];
    const phone: PhoneEntity = await service.findOne(storedPhone.id);
    expect(phone).not.toBeNull();
    expect(phone.name).toEqual(storedPhone.name)
    expect(phone.pricePerDay).toEqual(storedPhone.pricePerDay)
    expect(phone.stock).toEqual(storedPhone.stock)
    expect(phone.cameraSpecs).toEqual(storedPhone.cameraSpecs)
    expect(phone.memorySpecs).toEqual(storedPhone.memorySpecs)
    expect(phone.screenSpecs).toEqual(storedPhone.screenSpecs)
    expect(phone.isLastGeneration).toEqual(storedPhone.isLastGeneration)
    expect(phone.isOnSale).toEqual(storedPhone.isOnSale)
    expect(phone.image).toEqual(storedPhone.image)
  });

  it('findOne should throw an exception for an invalid phone', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The phone with the given id was not found")
  });

  it('create should return a new phone', async () => {
    const phone: PhoneEntity = {
      id: "",
      name: faker.lorem.word(),
      pricePerDay: faker.commerce.price(),
      stock: faker.number.int(),
      cameraSpecs: faker.lorem.sentence(),
      memorySpecs: faker.lorem.sentence(),
      screenSpecs: faker.lorem.sentence(),
      isLastGeneration: faker.datatype.boolean(),
      isOnSale: faker.datatype.boolean(),
      image: faker.image.url(),
      rents: [],
      reviews: [],
      brand: null,
      user: null
    }

    const newPhone: PhoneEntity = await service.create(phone);
    expect(newPhone).not.toBeNull();

    const storedPhone: PhoneEntity = await repository.findOne({ where: { id: newPhone.id } })
    expect(storedPhone).not.toBeNull();
    expect(storedPhone.name).toEqual(newPhone.name)
    expect(storedPhone.pricePerDay).toEqual(newPhone.pricePerDay)
    expect(storedPhone.stock).toEqual(newPhone.stock)
    expect(storedPhone.cameraSpecs).toEqual(newPhone.cameraSpecs)
    expect(storedPhone.memorySpecs).toEqual(newPhone.memorySpecs)
    expect(storedPhone.screenSpecs).toEqual(newPhone.screenSpecs)
    expect(storedPhone.isLastGeneration).toEqual(newPhone.isLastGeneration)
    expect(storedPhone.isOnSale).toEqual(newPhone.isOnSale)
    expect(storedPhone.image).toEqual(newPhone.image)
  });

  it('update should modify a phone', async () => {
    const phone: PhoneEntity = phonesList[0];
    phone.name = "New name";
    phone.pricePerDay = "4";
    phone.stock = 4;
    phone.cameraSpecs = "New camera specs";
    phone.memorySpecs = "New memory specs";
    phone.screenSpecs = "New screen specs";
    phone.isLastGeneration = true;
    phone.isOnSale = true;
    phone.image = "New image";

    const updatedPhone: PhoneEntity = await service.update(phone.id, phone);
    expect(updatedPhone).not.toBeNull();

    const storedPhone: PhoneEntity = await repository.findOne({ where: { id: phone.id } })
    expect(storedPhone).not.toBeNull();
    expect(storedPhone.name).toEqual(phone.name)
    expect(storedPhone.pricePerDay).toEqual(phone.pricePerDay)
    expect(storedPhone.stock).toEqual(phone.stock)
    expect(storedPhone.cameraSpecs).toEqual(phone.cameraSpecs)
    expect(storedPhone.memorySpecs).toEqual(phone.memorySpecs)
    expect(storedPhone.screenSpecs).toEqual(phone.screenSpecs)
    expect(storedPhone.isLastGeneration).toEqual(phone.isLastGeneration)
    expect(storedPhone.isOnSale).toEqual(phone.isOnSale)
    expect(storedPhone.image).toEqual(phone.image)
  });

  it('update should throw an exception for an invalid phone', async () => {
    let phone: PhoneEntity = phonesList[0];
    phone = {
      ...phone, name: "New name", pricePerDay: "New address"
    }
    await expect(() => service.update("0", phone)).rejects.toHaveProperty("message", "The phone with the given id was not found")
  });

  it('delete should remove a phone', async () => {
    const phone: PhoneEntity = phonesList[0];
    await service.delete(phone.id);

    const deletedPhone: PhoneEntity = await repository.findOne({ where: { id: phone.id } })
    expect(deletedPhone).toBeNull();
  });

  it('delete should throw an exception for an invalid phone', async () => {
    const phone: PhoneEntity = phonesList[0];
    await service.delete(phone.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The phone with the given id was not found")
  });

  it('addUser should add a user to a phone', async () => {
    const phone: PhoneEntity = phonesList[0];
    const user: UserEntity = await userRepository.save({
      id: "",
      name: faker.lorem.word(),
      email: "emaildeprueba@gmail.com",
      password: "Password123$$",
      favorites: [],
      reviews: [],
      rents: []
    })

    const updatedPhone: PhoneEntity = await service.addUser(phone.id, user.id);
    expect(updatedPhone).not.toBeNull();
    expect(updatedPhone.user).not.toBeNull();
    expect(updatedPhone.user.id).toEqual(user.id);
  });

  it('addUser should throw an exception for an invalid phone', async () => {
    const user: UserEntity = await userRepository.save({
      id: "",
      name: faker.lorem.word(),
      email: "emaildeprueba@gmail.com",
      password: "Password123$$",
      favorites: [],
      reviews: [],
      rents: []
    })

    await expect(() => service.addUser("0", user.id)).rejects.toHaveProperty("message", "The phone with the given id was not found")
  });

  it('addUser should throw an exception for an invalid user', async () => {
    const phone: PhoneEntity = phonesList[0];
    await expect(() => service.addUser(phone.id, "0")).rejects.toHaveProperty("message", "The user with the given id was not found")
  });

  it('removeUser should remove a user from a phone', async () => {
    const phone: PhoneEntity = phonesList[0];
    const user: UserEntity = await userRepository.save({
      id: "",
      name: faker.lorem.word(),
      email: "emaildeprueba@gmail.com",
      password: "Password123$$",
      favorites: [],
      reviews: [],
      rents: []
    })
    await service.addUser(phone.id, user.id);

    const updatedPhone: PhoneEntity = await service.removeUser(phone.id);
    expect(updatedPhone).not.toBeNull();
    expect(updatedPhone.user).toBeNull();
  });

  it('removeUser should throw an exception for an invalid phone', async () => {
    await expect(() => service.removeUser("0")).rejects.toHaveProperty("message", "The phone with the given id was not found")
  });
 


});