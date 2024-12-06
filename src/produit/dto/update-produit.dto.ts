/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitDto } from './create-produit.dto';
import { IsOptional } from 'class-validator';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {


    @IsOptional()
    designation: string;
  
    prix: Number;


}
