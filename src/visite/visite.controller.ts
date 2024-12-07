
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisiteService } from './visite.service';
import { CreateVisiteDto } from './dto/create-visite.dto';
import { UpdateVisiteDto } from './dto/update-visite.dto';
import { Visite } from './entities/visite.entity';

@Controller('visite')
export class VisiteController {
  constructor(private readonly visiteService: VisiteService) {}

//this function return all the vistis by user ID this response example :

/*[
    {
        "_id": "67524374f39dcce41a5e794c",
        "date": "2024-12-06T00:21:08.961Z",
        "observation": "cest un cher prix",
        "reclamation": "bon produit",
        "pieceJointe": "bilouna",
        "user": "67522fecc4e52db5aceb684f",
        "pointvente": {
            "_id": "67523f8c3811c4e3b1367e15",
            "gouvernorat": "string",
            "delegation": "string",
            "adresse": "string",
            "naturedepointdevente": "string",
            "tel": "string",
            "name": "string",
            "visites": [
                "67524374f39dcce41a5e794c",
                "675243e84a850603e44dd398",
                "675243e94a850603e44dd39e"
            ],
            "__v": 0
        },
        "__v": 0
    },,]*/


  @Get('user/:userId')
  async getVisitsByUser(@Param('userId') userId: string): Promise<Visite[]> {
    console.log("hshshhsbhbsbhsdbhdshbhbdkkkkkkkkkkkkkkkkkkkkshbshbshb",userId);
    return this.visiteService.getVisitsForUser(userId);
  }



//this function add a visit for a spesefic point de vente and for a spesific user 
@Post("add/:pointDeVenteId")
AddVistforAspecificPointDeVente( @Param('pointDeVenteId') pointDeVenteId: string , @Body() createVisiteDto: CreateVisiteDto) {
  return this.visiteService.createVisiteForEndpointAndUser(pointDeVenteId,createVisiteDto);
}




/* this function return an array of All  visits 
[{
        "_id": "675243e94a850603e44dd39e",
        "date": "2024-12-06T00:23:05.275Z",
        "observation": "string",
        "reclamation": "string",
        "pieceJointe": "string",
        "user": "67522fecc4e52db5aceb684f",
        "pointvente": "67523f8c3811c4e3b1367e15",
        "__v": 0
},.....]*/

  @Get()
  findAll() {
    return this.visiteService.findAll();
  }

/*
this function return a list of visitis with populate point de vente 
[{
        "_id": "67524374f39dcce41a5e794c",
        "date": "2024-12-06T00:21:08.961Z",
        "observation": "string",
        "reclamation": "string",
        "pieceJointe": "string",
        "user": "67522fecc4e52db5aceb684f",
        "pointvente": {
            "_id": "67523f8c3811c4e3b1367e15",
            "gouvernorat": "string",
            "delegation": "string",
            "adresse": "string",
            "naturedepointdevente": "string",
            "tel": "string",
            "name": "string",
            "visites": [
                "67524374f39dcce41a5e794c",
                "675243e84a850603e44dd398",
                "675243e94a850603e44dd39e"
            ],
            "__v": 0
        },
        "__v": 0
    },]
*/
  @Get("all")
  findAllVitis() {
    return this.visiteService.findAllVististWithPointDeVenteInfo();
  }



  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visiteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisiteDto: UpdateVisiteDto) {
    return this.visiteService.update(id, updateVisiteDto);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.visiteService.remove(id);
  }


}
