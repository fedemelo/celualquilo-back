import { IsNotEmpty, IsNumber, IsString, IsBoolean } from "class-validator";
// import { UserDto } from "src/user/user.dto";
// import { PhoneDto } from "src/phone/phone.dto";

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

    // @IsNotEmpty()
    // readonly phone: PhoneDto;

    // @IsNotEmpty()
    // readonly user: UserDto;
}