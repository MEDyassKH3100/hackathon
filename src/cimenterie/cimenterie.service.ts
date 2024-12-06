/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCimenterieDto } from './dto/create-cimenterie.dto';
import { UpdateCimenterieDto } from './dto/update-cimenterie.dto';
import { Cimenterie } from './entities/cimenterie.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CimenterieService {

  constructor(
    @InjectModel(Cimenterie.name) private readonly CimenterieModel: Model<Cimenterie>,
  ) {}



  async create(createCimenterieDto: CreateCimenterieDto): Promise<Cimenterie> {
    // Use destructuring to ensure fields are mapped correctly
    const newCimenterie = new this.CimenterieModel({
      ...createCimenterieDto,
    });
  
    // Save the instance to the database
    return await newCimenterie.save();
  }
  
  findAll() {
    return `This action returns all cimenterie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cimenterie`;
  }

  update(id: number, updateCimenterieDto: UpdateCimenterieDto) {
    return `This action updates a #${id} cimenterie`;
  }

  remove(id: number) {
    return `This action removes a #${id} cimenterie`;
  }
}
