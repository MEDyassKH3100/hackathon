import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['Admin', 'Commercial'], default: 'Commercial' })
  role: string;

  @Prop()
  nom?: string;

  @Prop()
  prenom?: string;

  @Prop()
  telephone?: string;

  @Prop()
  equipeRegionale?: string; // Utilisé uniquement pour les Commercials
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document; // Définition de UserDocument
