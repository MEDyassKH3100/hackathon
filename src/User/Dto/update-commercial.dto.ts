import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateCommercialDto {
    @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  equipeRegionale?: string;
}