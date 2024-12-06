/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePointventeDto } from './create-pointvente.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePointventeDto extends PartialType(CreatePointventeDto) {



    @IsString()
    gouvernorat: string;
  
    @IsString()
    delegation: string;
  
    @IsString()
    adresse: string;
  
    @IsString()
    naturedepointdevente: string;
  
    @IsString()
    tel: string;
  
    @IsString()
    name: string;
  

}
