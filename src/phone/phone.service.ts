import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneEntity } from './phone.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PhoneService {

    constructor(
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async findAll(): Promise<PhoneEntity[]> {
        return await this.phoneRepository.find({ relations: ["user", "rents","reviews","brand"] });
    }

    async findOne(id: string): Promise<PhoneEntity> {
        const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id}, relations: ["user", "rents","reviews","brand"] } );
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);
   
        return phone;
    }

    async create(phone: PhoneEntity): Promise<PhoneEntity> {
        return await this.phoneRepository.save(phone);
    }

    async update(id: string, phone: PhoneEntity): Promise<PhoneEntity> {
        const persistedPhone: PhoneEntity = await this.phoneRepository.findOne({where:{id}});
        if (!persistedPhone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.phoneRepository.save({...persistedPhone, ...phone});
    }

    async delete(id: string) {
        const phone: PhoneEntity = await this.phoneRepository.findOne({where:{id}});
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.phoneRepository.remove(phone);
    }

    async addUser(id: string, userId: string): Promise<PhoneEntity> {
        const phone: PhoneEntity = await this.phoneRepository.findOne({where:{id}});
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);
        
        const user: UserEntity = await this.userRepository.findOne({where:{id: userId}});
        if (!user)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);

        phone.user = user;

        return await this.phoneRepository.save(phone);
    }

    async removeUser(id: string): Promise<PhoneEntity> {
        const phone: PhoneEntity = await this.phoneRepository.findOne({where:{id}});
        if (!phone)
          throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);
        
        phone.user = null;

        return await this.phoneRepository.save(phone);
    }
}
