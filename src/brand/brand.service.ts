import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { BrandEntity } from './brand.entity';

@Injectable()
export class BrandService {

    BRAND_NOT_FOUND: string = "The brand with the given id was not found";
    INVALID_IMAGE: string = "The image must be a valid URL";

    constructor(
        @InjectRepository(BrandEntity)
        private readonly brandRepository: Repository<BrandEntity>,

    ) { }

    async findAll(): Promise<BrandEntity[]> {
        return await this.brandRepository.find({ relations: ["phone"] });
    }

    async findOne(brandId: string): Promise<BrandEntity> {
        const brand = await this.brandRepository.findOne({ where: { id: brandId }, relations: ["phone"] });
        if (!brand)
            throw new BusinessLogicException(this.BRAND_NOT_FOUND, BusinessError.NOT_FOUND)

        return brand;
    }

    async create(brandEntity: BrandEntity): Promise<BrandEntity> {

        this.checkImage(brandEntity.image);

        return await this.brandRepository.save(brandEntity);
    }

    async update(brandId: string, brandEntity: BrandEntity): Promise<BrandEntity> {
        const brand = await this.brandRepository.findOne({ where: { id: brandId } });
        if (!brand)
            throw new BusinessLogicException(this.BRAND_NOT_FOUND, BusinessError.NOT_FOUND)

        this.checkImage(brand.image);

        return await this.brandRepository.save({ ...brand, ...brandEntity });
    }

    async delete(brandId: string) {
        const brand = await this.brandRepository.findOne({ where: { id: brandId } });
        if (!brand)
            throw new BusinessLogicException(this.BRAND_NOT_FOUND, BusinessError.NOT_FOUND)

        return await this.brandRepository.remove(brand);
    }

    checkImage(image: string) {
        if (! /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(image)) {
            throw new BusinessLogicException(this.INVALID_IMAGE, BusinessError.BAD_REQUEST);
        }
    }
}
