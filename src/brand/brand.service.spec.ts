import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { Repository } from 'typeorm';
import { BrandEntity } from './brand.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('BrandService', () => {
    let service: BrandService;
    let repository: Repository<BrandEntity>;
    let brandsList: BrandEntity[];

    const BRAND_NOT_FOUND: string = "The brand with the given id was not found";
    const INVALID_IMAGE: string = "The image must be a valid URL";

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [BrandService],
        }).compile();

        service = module.get<BrandService>(BrandService);
        repository = module.get<Repository<BrandEntity>>(getRepositoryToken(BrandEntity));
        await seedDatabase();
    });

    const seedDatabase = async () => {
        repository.clear();
        brandsList = [];
        for (let i = 0; i < 5; i++) {
            const brand: BrandEntity = await repository.save({
                name: faker.lorem.word(),
                image: faker.internet.url(),
            });
            brandsList.push(brand);
        }
    }

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findAll should return all Brands', async () => {
        const Brands: BrandEntity[] = await service.findAll();
        expect(Brands).not.toBeNull();
        expect(Brands).toHaveLength(brandsList.length);
    });

    it('findOne should return a Brand by id', async () => {
        const storedBrand: BrandEntity = brandsList[0];
        const Brand: BrandEntity = await service.findOne(storedBrand.id);
        expect(Brand).not.toBeNull();
        expect(Brand.name).toEqual(storedBrand.name)
        expect(Brand.image).toEqual(storedBrand.image)
    });

    it('findOne should throw an exception for an invalid Brand', async () => {
        await expect(() => service.findOne("0")).rejects.toHaveProperty("message", BRAND_NOT_FOUND)
    });

    it('create should return a new Brand', async () => {
        const Brand: BrandEntity = {
            id: "",
            name: faker.lorem.word(),
            image: faker.internet.url(),
            phone: null
        }

        const newBrand: BrandEntity = await service.create(Brand);
        expect(newBrand).not.toBeNull();

        const storedBrand: BrandEntity = await repository.findOne({ where: { id: newBrand.id } })
        expect(storedBrand).not.toBeNull();
        expect(storedBrand.name).toEqual(newBrand.name)
        expect(storedBrand.image).toEqual(newBrand.image)
    });

    it('create should return an Exception for an invalid image', async () => {
        const Brand: BrandEntity = {
            id: "",
            name: faker.lorem.word(),
            image: "invalid image",
            phone: null
        }

        await expect(() => service.create(Brand)).rejects.toHaveProperty("message", INVALID_IMAGE)
    });


    it('update should modify a brand', async () => {
        const Brand: BrandEntity = brandsList[0];
        Brand.name = "New name";
        Brand.image = "imagedeprueba@gmail.com";

        const updatedBrand: BrandEntity = await service.update(Brand.id, Brand);
        expect(updatedBrand).not.toBeNull();

        const storedBrand: BrandEntity = await repository.findOne({ where: { id: Brand.id } })
        expect(storedBrand).not.toBeNull();
        expect(storedBrand.name).toEqual(Brand.name)
        expect(storedBrand.image).toEqual(Brand.image)
    });

    it('update should return an Exception for an invalid image', async () => {
        const Brand: BrandEntity = {
            id: "",
            name: faker.lorem.word(),
            image: "invalid image",
            phone: null
        }

        await expect(() => service.create(Brand)).rejects.toHaveProperty("message", INVALID_IMAGE)
    });

    it('delete should remove a brand', async () => {
        const Brand: BrandEntity = brandsList[0];
        await service.delete(Brand.id);

        const deletedBrand: BrandEntity = await repository.findOne({ where: { id: Brand.id } })
        expect(deletedBrand).toBeNull();
    });

    it('delete should throw an exception for an invalid Brand', async () => {
        const Brand: BrandEntity = brandsList[0];
        await service.delete(Brand.id);
        await expect(() => service.delete("0")).rejects.toHaveProperty("message", BRAND_NOT_FOUND)
    });

});

