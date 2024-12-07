import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ProduitPrixVariation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Produit', required: true })
  produit: Types.ObjectId; // Reference to Produit model

  @Prop({ type: Types.ObjectId, ref: 'Cimenterie', required: true })
  cimenterie: Types.ObjectId; // Reference to Cimenterie model

  @Prop({ type: Types.ObjectId, ref: 'Visite', required: true })
  visite: Types.ObjectId; // Reference to Visite model

  @Prop({ required: true })
  prix: number; // Product price for this variation
}

export const ProduitPrixVariationSchema =SchemaFactory.createForClass(ProduitPrixVariation);
