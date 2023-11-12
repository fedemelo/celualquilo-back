import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from './rent.service';
import { Repository } from 'typeorm';
import { RentEntity } from './rent.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

enum PaymentMethod {
    CASH = 'Cash',
    CREDIT_CARD = 'Credit card',
    DEBIT_CARD = 'Debit card',
}

describe('RentService', () => {
    let service: RentService;
    let repository: Repository<RentEntity>;
    let rentsList: RentEntity[];

    const RENT_NOT_FOUND: string = "The rent with the given id was not found";
    const INVALID_PAYMENT_METHOD: string = "The payment method must be one of the following: Cash, Credit card, Debit card";
    const INVALID_PHONE_NUMBER: string = "The phone number may only include spaces, hyphens, and a regional code starting with '+'.";


    const getRandomPaymentMethod = () => {
        // Chooses a random payment method from the enum
        return Object.values(PaymentMethod)[Math.floor(Math.random() * Object.values(PaymentMethod).length)];
    }

    const generatePhoneNumber = () => {
        const phoneNumbers: string[] = [
            '555 123-4567',
            '+1 555 987-6543',
            '12-800-555-1234',
          ];
        return phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [RentService],
        }).compile();

        service = module.get<RentService>(RentService);
        repository = module.get<Repository<RentEntity>>(getRepositoryToken(RentEntity));
        await seedDatabase();
    });

    const seedDatabase = async () => {
        repository.clear();
        rentsList = [];
        let switchActive: boolean = true;
        for (let i = 0; i < 5; i++) {
            const rent: RentEntity = await repository.save({
                isActive: switchActive,
                startDate: new Date(),
                endDate: new Date(),
                paymentMethod: getRandomPaymentMethod(), 
                address: faker.lorem.word(),
                city: faker.lorem.word(),
                telephoneNumber: generatePhoneNumber(),
            });
            rentsList.push(rent);
            switchActive = !switchActive;
        }
    }

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findAll should return all Rents', async () => {
        const Rents: RentEntity[] = await service.findAll();
        expect(Rents).not.toBeNull();
        expect(Rents).toHaveLength(rentsList.length);
    });

    it('findOne should return a Rent by id', async () => {
        const storedRent: RentEntity = rentsList[0];
        const Rent: RentEntity = await service.findOne(storedRent.id);
        expect(Rent).not.toBeNull();
        expect(Rent.isActive).toEqual(storedRent.isActive)
        expect(Rent.startDate).toEqual(storedRent.startDate)
        expect(Rent.endDate).toEqual(storedRent.endDate)
        expect(Rent.paymentMethod).toEqual(storedRent.paymentMethod)
        expect(Rent.address).toEqual(storedRent.address)
        expect(Rent.city).toEqual(storedRent.city)
        expect(Rent.telephoneNumber).toEqual(storedRent.telephoneNumber)
    });

    it('findOne should throw an exception for an invalid Rent', async () => {
        await expect(() => service.findOne("0")).rejects.toHaveProperty("message", RENT_NOT_FOUND)
    });

    it('create should return a new Rent', async () => {
        const Rent: RentEntity = {
            id: "",
            isActive: true,
            startDate: new Date(),
            endDate: new Date(),
            paymentMethod: getRandomPaymentMethod(),
            address: faker.lorem.word(),
            city: faker.lorem.word(),
            telephoneNumber: generatePhoneNumber(),
            phone: null,
            user: null
        }

        const newRent: RentEntity = await service.create(Rent);
        expect(newRent).not.toBeNull();

        const storedRent: RentEntity = await repository.findOne({ where: { id: newRent.id } })
        expect(storedRent).not.toBeNull();
        expect(storedRent.isActive).toEqual(newRent.isActive)
        expect(storedRent.startDate).toEqual(newRent.startDate)
        expect(storedRent.endDate).toEqual(newRent.endDate)
        expect(storedRent.paymentMethod).toEqual(newRent.paymentMethod)
        expect(storedRent.address).toEqual(newRent.address)
        expect(storedRent.city).toEqual(newRent.city)
        expect(storedRent.telephoneNumber).toEqual(newRent.telephoneNumber)
    });

    it('create should return an Exception for an invalid paymentMethod', async () => {
        const Rent: RentEntity = {
            id: "",
            isActive: true,
            startDate: new Date(),
            endDate: new Date(),
            paymentMethod: "Other",
            address: faker.lorem.word(),
            city: faker.lorem.word(),
            telephoneNumber: generatePhoneNumber(),
            phone: null,
            user: null
        }

        await expect(() => service.create(Rent)).rejects.toHaveProperty("message", INVALID_PAYMENT_METHOD)
    });

    it('create should return an Exception for an invalid telephoneNumber', async () => {
        const Rent: RentEntity = {
            id: "",
            isActive: true,
            startDate: new Date(),
            endDate: new Date(),
            paymentMethod: getRandomPaymentMethod(),
            address: faker.lorem.word(),
            city: faker.lorem.word(),
            telephoneNumber: "abc",
            phone: null,
            user: null
        }

        await expect(() => service.create(Rent)).rejects.toHaveProperty("message", INVALID_PHONE_NUMBER)
    });

    it('update should modify a rent', async () => {
        const Rent: RentEntity = rentsList[0];
        Rent.isActive = false;
        Rent.startDate = new Date();
        Rent.endDate = new Date();
        Rent.paymentMethod = getRandomPaymentMethod();
        Rent.address = faker.lorem.word();
        Rent.city = faker.lorem.word();
        Rent.telephoneNumber = generatePhoneNumber();

        const updatedRent: RentEntity = await service.update(Rent.id, Rent);
        expect(updatedRent).not.toBeNull();

        const storedRent: RentEntity = await repository.findOne({ where: { id: Rent.id } })
        expect(storedRent).not.toBeNull();
        expect(storedRent.isActive).toEqual(Rent.isActive)
        expect(storedRent.startDate).toEqual(Rent.startDate)
        expect(storedRent.endDate).toEqual(Rent.endDate)
        expect(storedRent.paymentMethod).toEqual(Rent.paymentMethod)
        expect(storedRent.address).toEqual(Rent.address)
        expect(storedRent.city).toEqual(Rent.city)
        expect(storedRent.telephoneNumber).toEqual(Rent.telephoneNumber)
    });

    it('update should throw an exception for an invalid rent', async () => {
        let Rent: RentEntity = rentsList[0];
        Rent = {
            ...Rent, id: "0", isActive: false, startDate: new Date(), endDate: new Date(), paymentMethod: faker.lorem.word(),
        }
        await expect(() => service.update("0", Rent)).rejects.toHaveProperty("message", RENT_NOT_FOUND)
    });

    it('update should return an Exception for an invalid paymentMethod', async () => {
        const Rent: RentEntity = {
            id: "",
            isActive: true,
            startDate: new Date(),
            endDate: new Date(),
            paymentMethod: "Other",
            address: faker.lorem.word(),
            city: faker.lorem.word(),
            telephoneNumber: generatePhoneNumber(),
            phone: null,
            user: null
        }

        await expect(() => service.create(Rent)).rejects.toHaveProperty("message", INVALID_PAYMENT_METHOD)
    });

    it('update should return an Exception for an invalid telephoneNumber', async () => {
        const Rent: RentEntity = {
            id: "",
            isActive: true,
            startDate: new Date(),
            endDate: new Date(),
            paymentMethod: getRandomPaymentMethod(),
            address: faker.lorem.word(),
            city: faker.lorem.word(),
            telephoneNumber: "abc",
            phone: null,
            user: null
        }

        await expect(() => service.create(Rent)).rejects.toHaveProperty("message", INVALID_PHONE_NUMBER)
    });

    it('delete should remove a rent', async () => {
        const Rent: RentEntity = rentsList[0];
        await service.delete(Rent.id);

        const deletedRent: RentEntity = await repository.findOne({ where: { id: Rent.id } })
        expect(deletedRent).toBeNull();
    });

    it('delete should throw an exception for an invalid Rent', async () => {
        const Rent: RentEntity = rentsList[0];
        await service.delete(Rent.id);
        await expect(() => service.delete("0")).rejects.toHaveProperty("message", RENT_NOT_FOUND)
    });

});

