/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable prettier/prettier */
// src/dto/create-visite.dto.ts

import {IsNumber, IsOptional, IsString } from "class-validator";


export class CreateProduitDto {

@IsOptional()
  @IsString()
  designation: string;
  @IsNumber()
  prix: Number;

}
