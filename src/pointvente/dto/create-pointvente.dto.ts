
import { IsString, IsNotEmpty } from 'class-validator';

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
  typeDeVente:string

  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  
  
}
