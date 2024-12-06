/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// src/schemas/visite.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Produit extends Document {
  @Prop({ required: false })
  designation: string;

  @Prop({ required: false })
  prix : number

}
export const ProduitSchema = SchemaFactory.createForClass(Produit);
