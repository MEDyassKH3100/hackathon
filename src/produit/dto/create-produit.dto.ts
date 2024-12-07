

import { IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateProduitDto {

  @IsOptional()
  @IsString()
  designation: string;

  @IsNumber()
  prix: number;

}
