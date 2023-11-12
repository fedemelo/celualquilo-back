import { IsNotEmpty, IsString, IsBoolean, IsEnum } from "class-validator";

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
    @IsEnum(["CASH", "CREDIT_CARD", "DEBIT_CARD", "PAYPAL"])
    readonly paymentMethod: string;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @IsNotEmpty()
    @IsString()
    readonly telephoneNumber: string;
}