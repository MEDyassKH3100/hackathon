/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointventeService } from './pointvente.service';
import { CreatePointventeDto } from './dto/create-pointvente.dto';
import { UpdatePointventeDto } from './dto/update-pointvente.dto';
import { CreateVisiteDto } from 'src/visite/dto/create-visite.dto';

@Controller('pointvente')
export class PointventeController {



  constructor(private readonly pointventeService: PointventeService) {}



//this function Create Point De venete return 
/*{
  "gouvernorat": "string",
  "delegation": "string",
  "adresse": "string",
  "naturedepointdevente": "string",
  "tel": "string",
  "name": "string",
  "visites": [],
  "_id": "67520daf7ac66b0fec78eb09",
  "__v": 0
}*/
  @Post()
  create(@Body() createPointventeDto: CreatePointventeDto) {
    return this.pointventeService.addPointDeVente(createPointventeDto);
  }


  //this function return all the visites related to a  spesefic pointdevente response :  array[Visits]
  
  /* this isthe response 
  [
   {
        "_id": "6752280edefb5f761bbc1bb6",
        "date": "2024-12-05T22:24:14.949Z",
        "observation": "string",
        "reclamation": "string",
        "pieceJointe": "string",
        "user": "6751f94755c83aef5e3ba474",
        "pointvente": "67520daf7ac66b0fec78eb09",
        "__v": 0
    },....
]
*/
  @Get("visitsRelatedToPointDeVente/:id")
  //you should provide the id of the point de vente to het all the vistss done for it 
  getVisiteIdsForPointvent(@Param('id') id: string) {
    return this.pointventeService.getVisiteDetailsForPointvente(id);
  }



  @Get()
  findAll() {
    return this.pointventeService.getAllPointventes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointventeService.getPointventeById(id);
  }

  @Patch(':id')
async update(
  @Param('id') id: string, 
  @Body() updatePointventeDto: UpdatePointventeDto
) {
  return this.pointventeService.update(id, updatePointventeDto);
}

// Endpoint to remove a Point de Vente
@Delete(':id')
async remove(@Param('id') id: string) {
  return this.pointventeService.remove(id);
}


}
