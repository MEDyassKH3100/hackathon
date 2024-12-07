
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectModel(Produit.name) private readonly produitModel: Model<Produit>,
  ) {}

  // Create a new Produit
  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    const { designation, prix } = createProduitDto;
    const newProduit = new this.produitModel({
      designation,
      prix,
    });
    console.log(newProduit);
    return newProduit.save(); // Save the produit to the database
  }

  // Get all Produits
  async findAll(): Promise<Produit[]> {
    console.log(this.produitModel.find().exec());
    return this.produitModel.find().exec(); // Return all produits from the database
  }

  // Get a single Produit by ID
  async findOne(id: string): Promise<Produit> {
    return this.produitModel.findById(id).exec(); // Find and return the produit by its ID
  }

  // Update a Produit by ID
  async update(id: string, updateProduitDto: UpdateProduitDto): Promise<Produit> {
    return this.produitModel.findByIdAndUpdate(id, updateProduitDto, { new: true }).exec(); // Update and return the updated produit
  }

  // Delete a Produit by ID
  async remove(id: string): Promise<Produit> {
    return this.produitModel.findByIdAndDelete(id).exec(); // Delete the produit by its ID and return it
  }
}
