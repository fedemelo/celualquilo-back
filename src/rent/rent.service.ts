import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RentEntity } from './rent.entity';


enum PaymentMethod {
    CASH = 'Cash',
    CREDIT_CARD = 'Credit card',
    DEBIT_CARD = 'Debit card',
}

@Injectable()
export class RentService {

    RENT_NOT_FOUND: string = "The rent with the given id was not found";
    INVALID_PAYMENT_METHOD: string = "The payment method must be one of the following: Cash, Credit card, Debit card";
    INVALID_PHONE_NUMBER: string = "The phone number may only include spaces, hyphens, and a regional code starting with '+'.";

    constructor(
        @InjectRepository(RentEntity)
        private readonly rentRepository: Repository<RentEntity>,
    ) { }

    async findAll(): Promise<RentEntity[]> {
        return await this.rentRepository.find({ relations : ["phone"]});
    }

    async findOne(rentId: string): Promise<RentEntity> {
        const rent = await this.rentRepository.findOne({ where: { id: rentId }, relations : ["phone"]});
        if (!rent)
            throw new BusinessLogicException(this.RENT_NOT_FOUND, BusinessError.NOT_FOUND)
        return rent;
    }

    async create(rent: RentEntity): Promise<RentEntity> {

        this.checkPaymentMethod(rent.paymentMethod);
        this.checkPhoneNumber(rent.telephoneNumber);

        return await this.rentRepository.save(rent);
    }

    async update(rentId: string, rentEntity: RentEntity): Promise<RentEntity> {
        const rent = await this.rentRepository.findOne({ where: { id: rentId } });
        if (!rent)
            throw new BusinessLogicException(this.RENT_NOT_FOUND, BusinessError.NOT_FOUND)

        this.checkPaymentMethod(rent.paymentMethod);
        this.checkPhoneNumber(rent.telephoneNumber);

        return await this.rentRepository.save({ ...rent, ...rentEntity });
    }

    async delete(rentId: string) {
        const rent = await this.rentRepository.findOne({ where: { id: rentId } });
        if (!rent)
            throw new BusinessLogicException(this.RENT_NOT_FOUND, BusinessError.NOT_FOUND)

        await this.rentRepository.remove(rent);
    }

    checkPaymentMethod(paymentMethod: string) {
        if (!Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)) {
            throw new BusinessLogicException(this.INVALID_PAYMENT_METHOD, BusinessError.BAD_REQUEST);
        }
    }

    checkPhoneNumber(phoneNumber: string) {
        if (! /^\+?(\d|\-|\s)+/.test(phoneNumber)) {
            throw new BusinessLogicException(this.INVALID_PHONE_NUMBER, BusinessError.BAD_REQUEST);
        }
    }

}
