/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProduitPrixVariationService } from './produit-prix-variation.service';
import { ProduitPrixVariationController } from './produit-prix-variation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProduitPrixVariation, ProduitPrixVariationSchema } from './entities/produit-prix-variation.entity';
import { Cimenterie, CimenterieSchema } from 'src/cimenterie/entities/cimenterie.entity';
import { Produit, ProduitSchema } from 'src/produit/entities/produit.entity';
import { Visite, VisiteSchema } from 'src/visite/entities/visite.entity';
import { Pointvente, PointventeSchema } from 'src/pointvente/entities/pointvente.entity';
import { User ,UserSchema} from 'src/user/Schema/user.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: ProduitPrixVariation.name, schema: ProduitPrixVariationSchema },
      { name: Cimenterie.name, schema: CimenterieSchema },
      { name: Produit.name, schema: ProduitSchema },
      { name: Visite.name, schema: VisiteSchema },
      { name: Pointvente.name, schema: PointventeSchema },
      { name: User.name, schema: UserSchema },




    ]),
  ],
  controllers: [ProduitPrixVariationController],
  providers: [ProduitPrixVariationService],
})
export class ProduitPrixVariationModule {}
