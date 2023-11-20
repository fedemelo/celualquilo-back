import { IsString, IsNotEmpty,IsUrl, IsNumber, IsBoolean } from 'class-validator';

export class PhoneDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly pricePerDay: string;

    @IsNumber()
    @IsNotEmpty()
    readonly stock: number;

    @IsString()
    @IsNotEmpty()
    readonly cameraSpecs: string;

    @IsString()
    @IsNotEmpty()
    readonly memorySpecs: string;

    @IsString()
    @IsNotEmpty()
    readonly screenSpecs: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly isLastGeneration: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly isOnSale: boolean;

    @IsUrl()
    @IsNotEmpty()   
    readonly image: string;
}
