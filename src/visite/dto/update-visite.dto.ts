/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVisiteDto } from './create-visite.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateVisiteDto extends PartialType(CreateVisiteDto) {


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


}
