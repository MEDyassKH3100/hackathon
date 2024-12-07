
import { IsString } from "class-validator";


export class CreateCimenterieDto {


    @IsString()
    name: string;

    @IsString()
    imageUrl: string;

}
