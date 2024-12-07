
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pointvente {
  @Prop({ required: true })
  gouvernorat: string;

  @Prop({ required: true })
  delegation: string;

  @Prop({ required: true })
  adresse: string;

  @Prop({ required: true })
  naturedepointdevente: string; // client direct ou non direct ou non client

  @Prop({ required: true })
  typeDeVente : string //Grousiste, détaillant


  @Prop({ required: true })
  tel: string;

  @Prop({ required: true })
  name: string;


  // One-to-many relationship with Visite
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Visite' })
  visites: Types.ObjectId[];
  
}

export const PointventeSchema = SchemaFactory.createForClass(Pointvente);
