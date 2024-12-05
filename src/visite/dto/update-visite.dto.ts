import { PartialType } from '@nestjs/mapped-types';
import { CreateVisiteDto } from './create-visite.dto';

export class UpdateVisiteDto extends PartialType(CreateVisiteDto) {}
