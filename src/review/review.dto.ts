import {IsNotEmpty, IsString, IsNumber} from 'class-validator';
export class ReviewDto {

    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsString()
    @IsNotEmpty()
    text: string;

}
