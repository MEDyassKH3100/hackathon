/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisiteService } from './visite.service';
import { CreateVisiteDto } from './dto/create-visite.dto';
import { UpdateVisiteDto } from './dto/update-visite.dto';

@Controller('visite')
export class VisiteController {
  constructor(private readonly visiteService: VisiteService) {}


  //create a visit and assosiated it to user 
  @Post(':userId')
  async createVisite(
    @Param('userId') userId: string,
    @Body() createVisiteDto: CreateVisiteDto,
  ) {
    return this.visiteService.createVisite(userId, createVisiteDto);
  }


  //see viesteted creataed by user 
  @Get(':userId')
  async getUserVisites(@Param('userId') userId: string) {
    console.log("this function called")
    return this.visiteService.getUserVisites(userId);
  }


  @Post()
  create(@Body() createVisiteDto: CreateVisiteDto) {
    return this.visiteService.create(createVisiteDto);
  }

  @Get()
  findAll() {
    return this.visiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisiteDto: UpdateVisiteDto) {
    return this.visiteService.update(+id, updateVisiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visiteService.remove(+id);
  }
}
