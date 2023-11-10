import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({ relations: ['rents', 'favorites', 'reviews'] });
    }

    async findOne(id: string): Promise<UserEntity> {
        const user: UserEntity = await this.userRepository.findOne({where: {id},  relations: ['rents', 'favorites', 'reviews'] });
        if (!user) {
            throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
        }
        return user;
    }

    async create(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }

    async update(id: string, user: UserEntity): Promise<UserEntity> {
        const persistedUser: UserEntity = await this.userRepository.findOne({where: {id}});
        if (!persistedUser) {
            throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
        }
        user.id = persistedUser.id;
        return await this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        const user: UserEntity = await this.userRepository.findOne({where: {id}});
        if (!user) {
            throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
        }
        await this.userRepository.remove(user);
    }

}
