import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PhoneEntity } from './phone.entity';
import { PhoneService } from './phone.service';

describe('PhoneService', () => {
 let service: PhoneService;
 let repository: Repository<PhoneEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [PhoneService],
   }).compile();

   service = module.get<PhoneService>(PhoneService);
   repository = module.get<Repository<PhoneEntity>>(getRepositoryToken(PhoneEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});