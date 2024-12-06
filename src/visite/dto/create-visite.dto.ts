/* eslint-disable prettier/prettier */
// src/dto/create-visite.dto.ts
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateVisiteDto {
@IsOptional()
  @IsDate()
  date: Date;

  @IsString()
  observation: string;

  @IsOptional()
  @IsString()
  reclamation?: string;

  @IsOptional()
  @IsString()
  pieceJointe?: string;

  @IsOptional()
  @IsString()
  userId:string

}
