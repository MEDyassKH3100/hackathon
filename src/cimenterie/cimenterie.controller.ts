import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CimenterieService } from './cimenterie.service';
import { CreateCimenterieDto } from './dto/create-cimenterie.dto';
import { UpdateCimenterieDto } from './dto/update-cimenterie.dto';

@Controller('cimenterie')
export class CimenterieController {
  constructor(private readonly cimenterieService: CimenterieService) {}

  @Post()
  create(@Body() createCimenterieDto: CreateCimenterieDto) {
    return this.cimenterieService.create(createCimenterieDto);
  }

  @Get()
  findAll() {
    console.log("houssem");
    return this.cimenterieService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cimenterieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCimenterieDto: UpdateCimenterieDto) {
    return this.cimenterieService.update(id, updateCimenterieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cimenterieService.remove(id);
  }
}
