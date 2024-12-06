/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cimenterie extends Document {
  @Prop({ required: true }) // Name is required
  name: string;
}

export const CimenterieSchema = SchemaFactory.createForClass(Cimenterie);
