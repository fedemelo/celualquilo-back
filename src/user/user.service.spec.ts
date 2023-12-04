import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<UserEntity>;
    let usersList: UserEntity[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
        await seedDatabase();
    });

    const seedDatabase = async () => {
        repository.clear();
        usersList = [];
        for (let i = 0; i < 5; i++) {
            const user: UserEntity = await repository.save({
                name: faker.lorem.word(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            });
            usersList.push(user);
        }
    }

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findAll should return all Users', async () => {
        const Users: UserEntity[] = await service.findAll();
        expect(Users).not.toBeNull();
        expect(Users).toHaveLength(usersList.length);
    });

    it('findAll should return an empty array', async () => {
        await repository.clear();
        const Users: UserEntity[] = await service.findAll();
        expect(Users).not.toBeNull();
        expect(Users).toHaveLength(0);
    });

    it('findOne should return a User by id', async () => {
        const storedUser: UserEntity = usersList[0];
        const User: UserEntity = await service.findOne(storedUser.id);
        expect(User).not.toBeNull();
        expect(User.name).toEqual(storedUser.name)
        expect(User.email).toEqual(storedUser.email)
        expect(User.password).toEqual(storedUser.password)
    });

    it('findOne should throw an exception for an invalid User', async () => {
        await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The user with the given id was not found")
    });

    it('create should return a new User', async () => {
        const User: UserEntity = {
            id: "",
            name: faker.lorem.word(),
            email: "emaildeprueba@gmail.com",
            password: "Password123$$",
            favorites: [],
            reviews: [],
            rents: []
        }

        const newUser: UserEntity = await service.create(User);
        expect(newUser).not.toBeNull();

        const storedUser: UserEntity = await repository.findOne({ where: { id: newUser.id } })
        expect(storedUser).not.toBeNull();
        expect(storedUser.name).toEqual(newUser.name)
        expect(storedUser.email).toEqual(newUser.email)
        expect(storedUser.password).toEqual(newUser.password)
    });

    it('create should return an Exception for an invalid email', async () => {
        const User: UserEntity = {
            id: "",
            name: faker.lorem.word(),
            email: "email invalido",
            password: "Password123$$",
            favorites: [],
            reviews: [],
            rents: []
        }

        await expect(() => service.create(User)).rejects.toHaveProperty("message", "The email is not valid")
    });

    it('create should return an Exception for an invalid password', async () => {
        const User: UserEntity = {
            id: "",
            name: faker.lorem.word(),
            email: "emaildeprueba@gmail.com",
            password: "Password invalido",
            favorites: [],
            reviews: [],
            rents: []
        }

        await expect(() => service.create(User)).rejects.toHaveProperty("message", "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character")
    });

    it('update should modify a user', async () => {
        const User: UserEntity = usersList[0];
        User.name = "New name";
        User.email = "emaildeprueba@gmail.com";
        User.password = "Password123$$";

        const updatedUser: UserEntity = await service.update(User.id, User);
        expect(updatedUser).not.toBeNull();

        const storedUser: UserEntity = await repository.findOne({ where: { id: User.id } })
        expect(storedUser).not.toBeNull();
        expect(storedUser.name).toEqual(User.name)
        expect(storedUser.email).toEqual(User.email)
    });

    it('update should throw an exception for an invalid user', async () => {
        let User: UserEntity = usersList[0];
        User = {
            ...User, name: "New name", email: "New email"
        }
        await expect(() => service.update("0", User)).rejects.toHaveProperty("message", "The user with the given id was not found")
    });

    it('update should return an Exception for an invalid email', async () => {
        const User: UserEntity = {
            id: "",
            name: faker.lorem.word(),
            email: "email invalido",
            password: "Password123$$",
            favorites: [],
            reviews: [],
            rents: []
        }

        await expect(() => service.create(User)).rejects.toHaveProperty("message", "The email is not valid")
    });

    it('update should return an Exception for an invalid password', async () => {
        const User: UserEntity = {
            id: "",
            name: faker.lorem.word(),
            email: "email@gmail.com",
            password: "Password invalido",
            favorites: [],
            reviews: [],
            rents: []
        }

        await expect(() => service.create(User)).rejects.toHaveProperty("message", "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character")
    });

    it('delete should remove a user', async () => {
        const User: UserEntity = usersList[0];
        await service.delete(User.id);

        const deletedUser: UserEntity = await repository.findOne({ where: { id: User.id } })
        expect(deletedUser).toBeNull();
    });

    it('delete should throw an exception for an invalid User', async () => {
        const User: UserEntity = usersList[0];
        await service.delete(User.id);
        await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The user with the given id was not found")
    });

});

