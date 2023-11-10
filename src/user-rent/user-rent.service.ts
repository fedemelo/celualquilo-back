import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentEntity } from '../rent/rent.entity';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UserRentService {
   constructor(
       @InjectRepository(UserEntity)
       private readonly userRepository: Repository<UserEntity>,
   
       @InjectRepository(RentEntity)
       private readonly rentRepository: Repository<RentEntity>
   ) {}

   async addRentUser(userId: string, rentId: string): Promise<UserEntity> {
       const rent: RentEntity = await this.rentRepository.findOne({where: {id: rentId}});
       if (!rent)
         throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND);
     
       const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["rents", "favorites", "reviews"]})
       if (!user)
         throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
   
       user.rents = [...user.rents, rent];
       return await this.userRepository.save(user);
     }
   
   async findRentByUserIdRentId(userId: string, rentId: string): Promise<RentEntity> {
       const rent: RentEntity = await this.rentRepository.findOne({where: {id: rentId}});
       if (!rent)
         throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND)
      
       const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["rents", "favorites", "reviews"]});
       if (!user)
         throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
  
       const userRent: RentEntity = user.rents.find(e => e.id === rent.id);
  
       if (!userRent)
         throw new BusinessLogicException("The rent with the given id is not associated to the user", BusinessError.PRECONDITION_FAILED)
  
       return userRent;
   }
   
   async findRentsByUserId(userId: string): Promise<RentEntity[]> {
       const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["rents"]});
       if (!user)
         throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
      
       return user.rents;
   }
   
   async associateRentsUser(userId: string, rents: RentEntity[]): Promise<UserEntity> {
       const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["rents"]});
   
       if (!user)
         throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
   
       for (const element of rents) {
         const rent: RentEntity = await this.rentRepository.findOne({where: {id: element.id}});
         if (!rent)
           throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       user.rents = rents;
       return await this.userRepository.save(user);
     }
   
   async deleteRentUser(userId: string, rentId: string){
       const rent: RentEntity = await this.rentRepository.findOne({where: {id: rentId}});
       if (!rent)
         throw new BusinessLogicException("The rent with the given id was not found", BusinessError.NOT_FOUND)
   
       const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["rents"]});
       if (!user)
         throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
   
       const userRent: RentEntity = user.rents.find(e => e.id === rent.id);
   
       if (!userRent)
           throw new BusinessLogicException("The rent with the given id is not associated to the user", BusinessError.PRECONDITION_FAILED)

       user.rents = user.rents.filter(e => e.id !== rentId);
       await this.userRepository.save(user);
   }  
}