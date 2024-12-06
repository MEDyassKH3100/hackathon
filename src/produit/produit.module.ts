/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Produit, ProduitSchema } from './entities/produit.entity';
import { Cimenterie, CimenterieSchema } from 'src/cimenterie/entities/cimenterie.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Produit.name, schema: ProduitSchema },
      { name: Cimenterie.name, schema: CimenterieSchema },
    ]),
  ],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
