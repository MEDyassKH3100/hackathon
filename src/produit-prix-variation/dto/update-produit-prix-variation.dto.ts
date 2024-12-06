import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitPrixVariationDto } from './create-produit-prix-variation.dto';

export class UpdateProduitPrixVariationDto extends PartialType(CreateProduitPrixVariationDto) {}
