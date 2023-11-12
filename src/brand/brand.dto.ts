import { IsNotEmpty, IsString } from "class-validator";

export class BrandDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly image: string;
}