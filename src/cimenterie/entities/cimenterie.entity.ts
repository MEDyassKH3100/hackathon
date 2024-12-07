import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cimenterie extends Document {
  @Prop({ required: true }) // Name is required
  name: string;

  @Prop({ required: false })
  imageUrl: string;

}

export const CimenterieSchema = SchemaFactory.createForClass(Cimenterie);
