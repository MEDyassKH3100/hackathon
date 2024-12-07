
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
  
  async findAll() {
    return this.CimenterieModel.find();
  }

  async findOne(id: string) {
    return await this.CimenterieModel.findById(id);
  }

  update(id: string, update: UpdateCimenterieDto) {
    return this.CimenterieModel.findByIdAndUpdate(id, update, { new: true });
  }
  // async updateUser(id: string, updateProfileDto: UpdateUserDto): Promise<User> {
  //   return this.userModel.findByIdAndUpdate(id, updateProfileDto, { new: true });
  // }


  remove(id: string) {
    return this.CimenterieModel.findByIdAndDelete(id);
  }
}
