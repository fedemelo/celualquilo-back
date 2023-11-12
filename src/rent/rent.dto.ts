import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsPhoneNumber } from "class-validator";

enum PaymentMethod {
    CASH = "Cash",
    CREDIT_CARD = "Credit card",
    DEBIT_CARD = "Debit card",
}

export class RentDto {

    @IsNotEmpty()
    @IsBoolean()
    readonly isActive: boolean;

    @IsNotEmpty()
    @IsString()
    readonly startDate: Date;

    @IsNotEmpty()
    @IsString()
    readonly endDate: Date;

    @IsNotEmpty()
    @IsString()
    @IsEnum(PaymentMethod)
    readonly paymentMethod: string;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    readonly telephoneNumber: string;
}