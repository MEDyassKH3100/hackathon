import { PartialType } from '@nestjs/mapped-types';
import { CreateCimenterieDto } from './create-cimenterie.dto';

export class UpdateCimenterieDto extends PartialType(CreateCimenterieDto) {}
