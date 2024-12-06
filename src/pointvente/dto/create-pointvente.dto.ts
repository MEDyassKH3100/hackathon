/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePointventeDto {
  @IsString()
  @IsNotEmpty()
  gouvernorat: string;

  @IsString()
  @IsNotEmpty()
  delegation: string;

  @IsString()
  @IsNotEmpty()
  adresse: string;

  @IsString()
  @IsNotEmpty()
  naturedepointdevente: string;

  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  
  
}
