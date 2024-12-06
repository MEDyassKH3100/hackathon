/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Delete, Injectable, Patch } from '@nestjs/common';
import { CreatePointventeDto } from './dto/create-pointvente.dto';
import { UpdatePointventeDto } from './dto/update-pointvente.dto';
import { Model, ObjectId, Types } from 'mongoose';
import { Pointvente } from './entities/pointvente.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Visite } from 'src/visite/entities/visite.entity';
import { CreateVisiteDto } from 'src/visite/dto/create-visite.dto';
import { User } from 'src/user/Schema/user.schema';

@Injectable()
export class PointventeService {
  constructor(

  @InjectModel(Pointvente.name) private readonly pointventeModel: Model<Pointvente>,  
  @InjectModel(Visite.name) private readonly visiteModel: Model<Visite>,
  @InjectModel(User.name) private readonly userModel: Model<User>,  

)
  {}

  async addPointDeVente(createPointDeVenteDto: CreatePointventeDto): Promise<Pointvente> {
  
  
    // Create the Point de Vente
    const pointDeVente = new this.pointventeModel({
      ...createPointDeVenteDto,
    });
    const savedPointDeVente = await pointDeVente.save();
  
   
    return savedPointDeVente;
  }
  




  async getVisiteDetailsForPointvente(pointventeId: string) {

    // Find the Point de Vente by its ID and populate the 'visites' field with actual Visite documents
    const pointvente = await this.pointventeModel
      .findById(pointventeId)
      .populate('visites') // Populate the visites field with the full Visite documents
      .exec();

    if (!pointvente) {
      throw new Error('Point de Vente not found');
    }

    // Return the array of populated Visite documents
    return pointvente.visites;



  }



  async getAllPointventes(): Promise<Pointvente[]> {
    // Fetch all pointventes
    return this.pointventeModel.find().exec();
  }

  async getPointventeById(id: string): Promise<Pointvente> {
    // Fetch a pointvente by ID
    return this.pointventeModel.findById(id).exec();
  }
// Method to update a Point de Vente
async update(id: string, updatePointventeDto: UpdatePointventeDto): Promise<Pointvente> {
  // Find the Point de Vente by ID and update it with the new data
  const updatedPointvente = await this.pointventeModel.findByIdAndUpdate(
    id,
    updatePointventeDto,
    { new: true }, // Return the updated document
  ).exec();

  if (!updatedPointvente) {
    throw new Error(`Point de Vente with ID ${id} not found`);
  }

  return updatedPointvente;
}

// Method to remove a Point de Vente
async remove(id: string): Promise<{ message: string }> {
  // Find and remove the Point de Vente by ID
  const result = await this.pointventeModel.findByIdAndDelete(id).exec();

  if (!result) {
    throw new Error(`Point de Vente with ID ${id} not found`);
  }

  return { message: `Point de Vente with ID ${id} has been removed` };
}


}
