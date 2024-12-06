/* eslint-disable prettier/prettier */
// src/schemas/visite.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Visite extends Document {
  @Prop({ required: false })
  date: Date;

  @Prop({ required: true })
  observation: string;

  @Prop({ required: false })
  reclamation: string;

  @Prop({ required: false })
  pieceJointe: string; // You can change this to a buffer or file-related type if necessary

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Reference to the User schema

  @Prop({ type: Types.ObjectId, ref: 'Pointvente', required: true })
  pointvente: Types.ObjectId; // Reference to the Pointvente model
}

export const VisiteSchema = SchemaFactory.createForClass(Visite);
