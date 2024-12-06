/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateVisiteDto } from './dto/create-visite.dto';
import { UpdateVisiteDto } from './dto/update-visite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Visite } from './entities/visite.entity';
import { User } from 'src/user/Schema/user.schema';
import { Pointvente } from 'src/pointvente/entities/pointvente.entity';

@Injectable()
export class VisiteService {

  constructor(
    @InjectModel(Visite.name) private readonly visiteModel: Model<Visite>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Pointvente.name) private readonly PointVente: Model<Pointvente>,

  ) {}







  async getVisitsForUser(userId: string): Promise<Visite[]> {
    console.log("thi sfunction in invocked")
    // Validate if the user exists
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
  console.log(userId)
    // Find visits for the specific user
    const visits = await this.visiteModel
      .find({ user: new Types.ObjectId(userId) }).populate('pointvente')
      .exec();
  
    return visits;
  }















// this function assosiate a visist to exisisting point de vente by point de vente Id 

async createVisiteForEndpointAndUser(
  pointDeVenteId: string,
  createVisiteDto: CreateVisiteDto,
): Promise<Visite> {
  const { userId, observation, reclamation, pieceJointe } = createVisiteDto;

  console.log('this is the user id', userId);

  // Check if the user exists
  const user = await this.userModel.findById(userId).exec();
  if (!user) {
    throw new Error('User not found');
  }

  // Check if the point de vente exists
  const pointDeVente = await this.PointVente.findById(pointDeVenteId).exec();
  if (!pointDeVente) {
    throw new Error('Point de vente not found');
  }

  // Create the visit
  const visite = new this.visiteModel({
    observation,
    reclamation,
    pieceJointe,
    user: user._id,
    pointvente: pointDeVente._id,
    date: new Date(),
  });

  const savedVisite = await visite.save();

  // Push the visit ID into the user's `visites` array
  await this.userModel.findByIdAndUpdate(
    user._id,
    { $push: { visites: savedVisite._id } },
    { new: true },
  );

  // Push the visit ID into the point de vente's `visites` array
  await this.PointVente.findByIdAndUpdate(
    pointDeVente._id,
    { $push: { visites: savedVisite._id } },
    { new: true },
  );

  return savedVisite;
}




  findAll() {
  return this.visiteModel.find().exec();;
    }


    findAllVististWithPointDeVenteInfo() {
      return this.visiteModel
        .find()
        .populate('pointvente') // Populate the 'pointvente' field with its full details
        .exec();
    }
    





  create(createVisiteDto: CreateVisiteDto) {
    return 'This action adds a new visite';
  }

  

  async findOne(id: string): Promise<Visite> {
    const visite = await this.visiteModel
      .findById(id)
      .populate('pointvente') // Populate the 'pointvente' field
      .populate('user') // Optionally populate the 'user' field if needed
      .exec();
  
    if (!visite) {
      throw new Error(`Visite with ID ${id} not found`);
    }
  
    return visite;
  }
  
  async update(id: string, updateVisiteDto: UpdateVisiteDto): Promise<Visite> {
    const updatedVisite = await this.visiteModel
      .findByIdAndUpdate(id, updateVisiteDto, { new: true }) // Return the updated document
      .populate('pointvente') // Optionally populate related fields
      .populate('user') // Optionally populate the 'user' field
      .exec();
  
    if (!updatedVisite) {
      throw new Error(`Visite with ID ${id} not found`);
    }
  
    return updatedVisite;
  }
  
  async remove(id: string): Promise<Visite> {
    const visite = await this.visiteModel.findByIdAndDelete(id).exec();
  
    if (!visite) {
      throw new Error(`Visite with ID ${id} not found`);
    }
  
    // Optionally, remove references to the deleted Visite in related documents
    await this.userModel.findByIdAndUpdate(visite.user, {
      $pull: { visites: id },
    }).exec();
  
    await this.PointVente.findByIdAndUpdate(visite.pointvente, {
      $pull: { visites: id },
    }).exec();
  
    return visite;
  }
  
}
