/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RentEntity } from '../rent/rent.entity';
import { Repository } from 'typeorm';
import { PhoneEntity } from '../phone/phone.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PhoneRentService } from './phone-rent.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PhoneRentService', () => {
  let service: PhoneRentService;
  let phoneRepository: Repository<PhoneEntity>;
  let rentRepository: Repository<RentEntity>;
  let phone: PhoneEntity;
  let rentsList : RentEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PhoneRentService],
    }).compile();

    service = module.get<PhoneRentService>(PhoneRentService);
    phoneRepository = module.get<Repository<PhoneEntity>>(getRepositoryToken(PhoneEntity));
    rentRepository = module.get<Repository<RentEntity>>(getRepositoryToken(RentEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    rentRepository.clear();
    phoneRepository.clear();

    rentsList = [];
    for(let i = 0; i < 5; i++){
        const rent: RentEntity = await rentRepository.save({
          isActive: faker.datatype.boolean(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          paymentMethod: faker.finance.transactionType(),
          address: faker.lorem.word(),
          city: faker.lorem.word(),
          telephoneNumber: "322-111-5555",
        })
        rentsList.push(rent);
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
        rents: rentsList,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addRentPhone should add an rent to a phone', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: faker.datatype.boolean(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: faker.finance.transactionType(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      telephoneNumber: '322-111-5555',
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


    const result: PhoneEntity = await service.addRentPhone(newPhone.id, newRent.id);
    
    expect(result.rents.length).toBe(1);
    expect(result.rents[0].id).toBe(newRent.id);
    expect(result.rents[0].isActive).toBe(newRent.isActive);
    expect(result.rents[0].startDate).toStrictEqual(newRent.startDate);
    expect(result.rents[0].endDate).toStrictEqual(newRent.endDate);
    expect(result.rents[0].paymentMethod).toBe(newRent.paymentMethod);
    expect(result.rents[0].address).toBe(newRent.address);
    expect(result.rents[0].city).toBe(newRent.city);
    expect(result.rents[0].telephoneNumber).toBe(newRent.telephoneNumber);

  });

  it('addRentPhone should thrown exception for an invalid rent', async () => {
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
    })

    await expect(() => service.addRentPhone(newPhone.id, "0")).rejects.toHaveProperty("message", "The rent with the given id was not found");
  });

  it('addRentPhone should throw an exception for an invalid phone', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: faker.datatype.boolean(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: faker.finance.transactionType(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      telephoneNumber: '322-111-5555',
    });

    await expect(() => service.addRentPhone("0", newRent.id)).rejects.toHaveProperty("message", "The phone with the given id was not found");
  });

  it('findRentByPhoneIdRentId should return rent by phone', async () => {
    const rent: RentEntity = rentsList[0];
    const storedRent: RentEntity = await service.findRentByPhoneIdRentId(phone.id, rent.id, )
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

  it('findRentByPhoneIdRentId should throw an exception for an invalid rent', async () => {
    await expect(()=> service.findRentByPhoneIdRentId(phone.id, "0")).rejects.toHaveProperty("message", "The rent with the given id was not found"); 
  });

  it('findRentByPhoneIdRentId should throw an exception for an invalid phone', async () => {
    const rent: RentEntity = rentsList[0]; 
    await expect(()=> service.findRentByPhoneIdRentId("0", rent.id)).rejects.toHaveProperty("message", "The phone with the given id was not found"); 
  });

  it('findRentByPhoneIdRentId should throw an exception for an rent not associated to the phone', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: faker.datatype.boolean(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: faker.finance.transactionType(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      telephoneNumber: '322-111-5555',
    });

    await expect(()=> service.findRentByPhoneIdRentId(phone.id, newRent.id)).rejects.toHaveProperty("message", "The rent with the given id is not associated to the phone"); 
  });

  it('findRentsByPhoneId should return rents by phone', async ()=>{

    const rents: RentEntity[] = await service.findRentsByPhoneId(phone.id);
    expect(rents.length).toBe(5)
  });

  it('findRentsByPhoneId should throw an exception for an invalid phone', async () => {
    await expect(()=> service.findRentsByPhoneId("0")).rejects.toHaveProperty("message", "The phone with the given id was not found"); 
  });

  it('associateRentsPhone should update rents list for a phone', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: faker.datatype.boolean(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: faker.finance.transactionType(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      telephoneNumber: '322-111-5555',
    });

    const updatedPhone: PhoneEntity = await service.associateRentsPhone(phone.id, [newRent]);
    expect(updatedPhone.rents.length).toBe(1);
    expect(updatedPhone.rents[0].id).toBe(newRent.id);
    expect(updatedPhone.rents[0].isActive).toBe(newRent.isActive);
    expect(updatedPhone.rents[0].startDate).toStrictEqual(newRent.startDate);
    expect(updatedPhone.rents[0].endDate).toStrictEqual(newRent.endDate);
    expect(updatedPhone.rents[0].paymentMethod).toBe(newRent.paymentMethod);
    expect(updatedPhone.rents[0].address).toBe(newRent.address);
    expect(updatedPhone.rents[0].city).toBe(newRent.city);
    expect(updatedPhone.rents[0].telephoneNumber).toBe(newRent.telephoneNumber);

  });

  it('associateRentsPhone should throw an exception for an invalid phone', async () => {
    const newRent: RentEntity = await rentRepository.save({
      isActive: faker.datatype.boolean(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: faker.finance.transactionType(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      telephoneNumber: '322-111-5555',
    });

    await expect(()=> service.associateRentsPhone("0", [newRent])).rejects.toHaveProperty("message", "The phone with the given id was not found"); 
  });

  it('associateRentsPhone should throw an exception for an invalid rent', async () => {
    const newRent: RentEntity = rentsList[0];
    newRent.id = "0";

    await expect(()=> service.associateRentsPhone(phone.id, [newRent])).rejects.toHaveProperty("message", "The rent with the given id was not found"); 
  });

  it('deleteRentToPhone should remove an rent from a phone', async () => {
    const rent: RentEntity = rentsList[0];
    await service.deleteRentPhone(phone.id, rent.id);

    const storedPhone: PhoneEntity = await phoneRepository.findOne({where: {id: phone.id}, relations: ["rents"]});
    const deletedRent: RentEntity = storedPhone.rents.find(a => a.id === rent.id);

    expect(deletedRent).toBeUndefined();

  });

  it('deleteRentToPhone should thrown an exception for an invalid rent', async () => {
    await expect(()=> service.deleteRentPhone(phone.id, "0")).rejects.toHaveProperty("message", "The rent with the given id was not found"); 
  });

  it('deleteRentToPhone should thrown an exception for an invalid phone', async () => {
    const rent: RentEntity = rentsList[0];
    await expect(()=> service.deleteRentPhone("0", rent.id)).rejects.toHaveProperty("message", "The phone with the given id was not found"); 
  });

  it('deleteRentToPhone should thrown an exception for an non asocciated rent', async () => {
    const newRent: RentEntity = await rentRepository.save({

      isActive: faker.datatype.boolean(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      paymentMethod: faker.finance.transactionType(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      telephoneNumber: '322-111-5555',
    });

    await expect(()=> service.deleteRentPhone(phone.id, newRent.id)).rejects.toHaveProperty("message", "The rent with the given id is not associated to the phone"); 
  }); 

});