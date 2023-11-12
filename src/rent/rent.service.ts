import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RentEntity } from './rent.entity';

@Injectable()
export class RentService {

    RENT_NOT_FOUND: string = "The rent with the given id was not found";

    constructor(
        @InjectRepository(RentEntity)
        private readonly rentRepository: Repository<RentEntity>,
    ) { }

    async findAll(): Promise<RentEntity[]> {
        return await this.rentRepository.find();
    }

    async findOne(rentId: string): Promise<RentEntity> {
        const rent = await this.rentRepository.findOne({where: { id: rentId }});
        if (!rent)
            throw new BusinessLogicException(this.RENT_NOT_FOUND, BusinessError.NOT_FOUND)
        return rent;
    }

    async create(rent: RentEntity): Promise<RentEntity> {
        return await this.rentRepository.save(rent);
    }

    async update(rentId: string, rentEntity: RentEntity): Promise<RentEntity> {
        const rent = await this.rentRepository.findOne({where: { id: rentId }});
        if (!rent)
            throw new BusinessLogicException(this.RENT_NOT_FOUND, BusinessError.NOT_FOUND)

        return await this.rentRepository.save({ ...rent, ...rentEntity });
    }

    async delete(rentId: string) {
        const rent = await this.rentRepository.findOne({where: { id: rentId }});
        if (!rent)
            throw new BusinessLogicException(this.RENT_NOT_FOUND, BusinessError.NOT_FOUND)

        await this.rentRepository.remove(rent);
    }

}
