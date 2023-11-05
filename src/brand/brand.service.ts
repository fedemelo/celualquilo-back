import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/phone/phone.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { BrandEntity } from './brand.entity';

@Injectable()
export class BrandService {

    constructor(

        @InjectRepository(BrandEntity)
        private readonly brandRepository: Repository<BrandEntity>,

        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>
    ) { }

    async findAll(): Promise<BrandEntity[]> {
        return await this.brandRepository.find({ relations: ["phone"] });
    }

    async findOne(id: number): Promise<BrandEntity> {
        const brand = await this.brandRepository.findOne(id, { relations: ["phone"] });
        if (!brand)
            throw new BusinessLogicException("The brand with the given id was not found", BusinessError.NOT_FOUND)

        return brand;
    }

    async create(brandEntity: BrandEntity): Promise<BrandEntity> {
        return await this.brandRepository.save(brandEntity);
    }

    async update(id: number, brandEntity: BrandEntity): Promise<BrandEntity> {
        const brand = await this.brandRepository.findOne(id);
        if (!brand)
            throw new BusinessLogicException("The brand with the given id was not found", BusinessError.NOT_FOUND)

        return await this.brandRepository.save({ ...brand, ...brandEntity });
    }

    async delete(id: number) {
        const brand = await this.brandRepository.findOne(id);
        if (!brand)
            throw new BusinessLogicException("The brand with the given id was not found", BusinessError.NOT_FOUND)

        return await this.brandRepository.remove(brand);
    }
}
