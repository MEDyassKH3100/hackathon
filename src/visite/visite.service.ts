/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateVisiteDto } from './dto/create-visite.dto';
import { UpdateVisiteDto } from './dto/update-visite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Visite } from './entities/visite.entity';
import { User } from 'src/user/Schema/user.schema';

@Injectable()
export class VisiteService {

  constructor(
    @InjectModel(Visite.name) private readonly visiteModel: Model<Visite>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}


  async createVisite(userId: string, createVisiteDto: CreateVisiteDto): Promise<Visite> {
    const { date, observation, reclamation, pieceJointe } = createVisiteDto;
    console.log("this is the observation value ",observation)

    // Validate the user exists
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Create the visit
    const visite = new this.visiteModel({
      date,
      observation,
      reclamation,
      pieceJointe,
      user: user._id,
    });

    // Save the visit
    const savedVisite = await visite.save();

    // Add the visit to the user's visites array
    user.visites.push(savedVisite._id as Types.ObjectId);
    await user.save();

    return savedVisite;
  }



  async getUserVisites(userId: string): Promise<Visite[]> {
    const objectId = new Types.ObjectId(userId); // Convert string to ObjectId

    // Fetch visits for the user
    return this.visiteModel.find({ user: objectId }).exec();
  }



  create(createVisiteDto: CreateVisiteDto) {
    return 'This action adds a new visite';
  }

  findAll() {
    return `This action returns all visite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visite`;
  }

  update(id: number, updateVisiteDto: UpdateVisiteDto) {
    return `This action updates a #${id} visite`;
  }

  remove(id: number) {
    return `This action removes a #${id} visite`;
  }
}
