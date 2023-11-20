import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentEntity } from '../rent/rent.entity';
import { PhoneEntity } from '../phone/phone.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PhoneRentService {
   constructor(
       @InjectRepository(PhoneEntity)
       private readonly phoneRepository: Repository<PhoneEntity>,
   
       @InjectRepository(RentEntity)
       private readonly rentRepository: Repository<RentEntity>
   ) {}

   async addRentPhone(phoneId: string, rentId: string): Promise<PhoneEntity> {
       const rent: RentEntity = await this.rentRepository.findOne({where: {id: rentId}});
       if (!rent)
         throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND);
     
       const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["user","rents", "reviews", "brand"]});
       if (!phone)
         throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND);
   
       phone.rents = [...phone.rents, rent];
       return await this.phoneRepository.save(phone);
     }
   
   async findRentByPhoneIdRentId(phoneId: string, rentId: string): Promise<RentEntity> {
       const rent: RentEntity = await this.rentRepository.findOne({where: {id: rentId}});
       if (!rent)
         throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND)
       const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["user","rents", "reviews", "brand"]});
       if (!phone)
         throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND)
       const phoneRent: RentEntity = phone.rents.find(e => e.id === rent.id);
       if (!phoneRent)
         throw new BusinessLogicException("The rent with the given id is not associated to the phone", BusinessError.PRECONDITION_FAILED)
  
       return phoneRent;
   }
   
   async findRentsByPhoneId(phoneId: string): Promise<RentEntity[]> {
       const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["user","rents", "reviews", "brand"]});
       if (!phone)
         throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND)
      
       return phone.rents;
   }
   
   async associateRentsPhone(phoneId: string, rents: RentEntity[]): Promise<PhoneEntity> {
       const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["user","rents", "reviews", "brand"]});
   
       if (!phone)
         throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < rents.length; i++) {
         const rent: RentEntity = await this.rentRepository.findOne({where: {id: rents[i].id}});
         if (!rent)
           throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       phone.rents = rents;
       return await this.phoneRepository.save(phone);
     }
   
   async deleteRentPhone(phoneId: string, rentId: string){
       const rent: RentEntity = await this.rentRepository.findOne({where: {id: rentId}});
       if (!rent)
         throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND)
   
       const phone: PhoneEntity = await this.phoneRepository.findOne({where: {id: phoneId}, relations: ["rents"]});
       if (!phone)
         throw new BusinessLogicException("The phone with the given id was not found", BusinessError.NOT_FOUND)
   
       const phoneRent: RentEntity = phone.rents.find(e => e.id === rent.id);
   
       if (!phoneRent)
           throw new BusinessLogicException("The rent with the given id is not associated to the phone", BusinessError.PRECONDITION_FAILED)

       phone.rents = phone.rents.filter(e => e.id !== rentId);
       await this.phoneRepository.save(phone);
   }  
}