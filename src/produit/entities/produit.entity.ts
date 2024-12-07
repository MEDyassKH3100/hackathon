
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Produit extends Document {
  @Prop({ required: false })
  designation: string;

  @Prop({ required: true })
  prix : number

}
export const ProduitSchema = SchemaFactory.createForClass(Produit);
