/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProduitPrixVariationService } from './produit-prix-variation.service';
import { CreateProduitPrixVariationDto } from './dto/create-produit-prix-variation.dto';
import { UpdateProduitPrixVariationDto } from './dto/update-produit-prix-variation.dto';
import { CreateVisiteDto } from 'src/visite/dto/create-visite.dto';

@Controller('produit-prix-variation')
export class ProduitPrixVariationController {
  constructor(private readonly produitPrixVariationService: ProduitPrixVariationService) {}



/*example how you can test this funcyion in postmen 

create visit function 

{
  "pointDeVenteId": "675244a606a5cdf546751c7d",
  "createVisiteDto": {
    "date": "2024-12-05T10:00:00Z",
    "observation": "Visit observation text",
    "reclamation": "Reclamation text",
    "pieceJointe": "Attachment link",
    "userId": "67522fecc4e52db5aceb684f"
  },
  "data": [
    {
      "cimenterieId": "67527ce0fbf1182411d2f80f",
      "produits": ["67525cc94b152e3ada2c9925", "67525d228b3fdbf513e5f072"],
      "prixTable": [10.5, 20.0]
    },
    {
      "cimenterieId": "67527ba42c76063f9fa4563b",
      "produits": ["6752610659408ad9e756f5ab", "67525cc94b152e3ada2c9925"],
      "prixTable": [30.0, 40.0]
    }
  ]
}

!!important  for the data you to implement front logic that add  the content of data dynamicly 
*/


  @Post('/create-produit-prix-variation')
  async createProduitPrixVariation(
    @Body('pointDeVenteId') pointDeVenteId: string,
    @Body('createVisiteDto') createVisiteDto: CreateVisiteDto,
    @Body('data') data: {
      cimenterieId: string;
      produits: string[];
      prixTable: number[];
    }[],
  ) {
    return this.produitPrixVariationService.createProduitPrixVariation(
      pointDeVenteId,
      createVisiteDto,
      data,
    );
  }




  @Post()
  create(@Body() createProduitPrixVariationDto: CreateProduitPrixVariationDto) {
    return this.produitPrixVariationService.create(createProduitPrixVariationDto);
  }

  @Get()
  findAll() {
    return this.produitPrixVariationService.findAll();
  }
  @Get('/:id')
  async getVisiteById(@Param('id') id: string) {
    return this.produitPrixVariationService.getVisiteById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduitPrixVariationDto: UpdateProduitPrixVariationDto) {
    return this.produitPrixVariationService.update(+id, updateProduitPrixVariationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitPrixVariationService.remove(+id);
  }












}










