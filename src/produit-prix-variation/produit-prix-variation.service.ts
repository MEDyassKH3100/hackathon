/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreateProduitPrixVariationDto } from './dto/create-produit-prix-variation.dto';
import { UpdateProduitPrixVariationDto } from './dto/update-produit-prix-variation.dto';
import { CreateVisiteDto } from 'src/visite/dto/create-visite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Visite } from 'src/visite/entities/visite.entity';
import { Model, Types } from 'mongoose';
import { Pointvente } from 'src/pointvente/entities/pointvente.entity';
import { User } from 'src/user/Schema/user.schema';
import { Cimenterie } from 'src/cimenterie/entities/cimenterie.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import { ProduitPrixVariation } from './entities/produit-prix-variation.entity';

@Injectable()
export class ProduitPrixVariationService {

  constructor(
    @InjectModel(Visite.name) private readonly visiteModel: Model<Visite>,
    @InjectModel(Cimenterie.name) private readonly CimenterieModel: Model<Cimenterie>,
    @InjectModel(Pointvente.name) private readonly PointVenteModel: Model<Pointvente>,
    @InjectModel(Produit.name) private readonly ProduitModel: Model<Produit>,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    @InjectModel(ProduitPrixVariation.name) private readonly  produitPrixVariationModel: Model<ProduitPrixVariation>,


  ) {}


  create(createProduitPrixVariationDto: CreateProduitPrixVariationDto) {
    return 'This action adds a new produitPrixVariation';
  }



  async createVisiteForEndpointAndUser(
    pointDeVenteId: string,
    createVisiteDto: CreateVisiteDto,
  ): Promise<Visite> {
    const { userId, observation, reclamation, pieceJointe } = createVisiteDto;
  
    console.log('this is the user id', userId);
  
    // Check if the user exists
    const user = await this.UserModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
  
    // Check if the point de vente exists
    const pointDeVente = await this.PointVenteModel.findById(pointDeVenteId).exec();
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
    await this.UserModel.findByIdAndUpdate(
      user._id,
      { $push: { visites: savedVisite._id } },
      { new: true },
    );
  
    // Push the visit ID into the point de vente's `visites` array
    await this.PointVenteModel.findByIdAndUpdate(
      pointDeVente._id,
      { $push: { visites: savedVisite._id } },
      { new: true },
    );
  
    return savedVisite;
  }











  async createProduitPrixVariation(
    pointDeVenteId: string,
    createVisiteDto: CreateVisiteDto,
    data: {
      cimenterieId: string;
      produits: string[];
      prixTable: number[];
    }[],
  ): Promise<any[]> {
    // Validate Visit
    const createdVisite = await this.createVisiteForEndpointAndUser(
      pointDeVenteId,
      createVisiteDto,
    );
  
    const allVariations = [];
  
    // Loop through each cimenterie data
    for (const entry of data) {
      const { cimenterieId, produits, prixTable } = entry;
  
      // Validate Cimenterie
      const cimenterie = await this.CimenterieModel.findById(cimenterieId).exec();
      if (!cimenterie) {
        throw new Error(`Cimenterie with ID ${cimenterieId} not found`);
      }
  
      // Validate Produits
      const validProduits = await this.ProduitModel.find({
        _id: { $in: produits },
      }).exec();
      if (validProduits.length !== produits.length) {
        throw new Error(
          `Some Produit IDs are invalid for Cimenterie ID ${cimenterieId}`,
        );
      }
  
      // Validate PrixTable
      if (prixTable.length !== produits.length) {
        throw new Error(
          `PrixTable length must match Produits length for Cimenterie ID ${cimenterieId}`,
        );
      }
  
      // Create ProduitPrixVariation for this Cimenterie
      for (let i = 0; i < produits.length; i++) {
        const produitPrixVariation = new this.produitPrixVariationModel({
          produit: produits[i],
          cimenterie: cimenterieId,
          visite: createdVisite._id,
          prix: prixTable[i],
        });
  
        const savedProduitPrixVariation = await produitPrixVariation.save();
        allVariations.push(savedProduitPrixVariation);
      }
    }
  
    return allVariations;
  }
  






/* Update function  for vivist you should add this to the body of your reuqest 
example how yo can pass input to this function 
{
  "pointDeVenteId": "675244a606a5cdf546751c7d",
  "updateVisiteDto": {
    "date": "2024-12-06",
    "observation": "This is an updated observation",
    "reclamation": "Reclamation text here",
    "userId": "67522fecc4e52db5aceb684f"
  },
  "data": [
    {
      "cimenterieId": "675291b76feeb33c7b1c277e",
      "produits": ["67525d228b3fdbf513e5f072", "67525d228b3fdbf513e5f072"],
      "prixTable": [25.5, 30.0]
    },
    {
      "cimenterieId": "67527ce0fbf1182411d2f80f",
      "produits": ["67525d228b3fdbf513e5f072"],
      "prixTable": [20.0]
    }
  ]
}
*/


  async updateProduitPrixVariation(
    visiteId: string,
    pointDeVenteId: string,
    updateVisiteDto: { date: Date; observation: string; reclamation: string; userId: string },
    data: { cimenterieId: string; produits: string[]; prixTable: number[] }[],
  ): Promise<any[]> {
    // Step 1: Fetch and update visit details
    const visite = await this.visiteModel.findById(visiteId).exec();
    if (!visite) {
      throw new Error('Visite not found');
    }
  
    visite.date = updateVisiteDto.date;
    visite.observation = updateVisiteDto.observation;
    visite.reclamation = updateVisiteDto.reclamation;
    visite.user = new Types.ObjectId(updateVisiteDto.userId);
  
    await visite.save();
  
    // Step 2: Delete old variations for the visite
    await this.produitPrixVariationModel.deleteMany({ visite: visiteId });
  
    const allVariations = [];
  
    // Step 3: Create new variations
    for (const entry of data) {
      const { cimenterieId, produits, prixTable } = entry;
  
      // Validate that the produit IDs exist
      const validProduits = await this.ProduitModel.find({
        _id: { $in: produits },
      }).exec();
  
      /*if (validProduits.length !== produits.length) {
        throw new Error(
          `Some Produit IDs are invalid. Invalid IDs: ${produits.filter(
            id => !validProduits.map(p => p._id.toString()).includes(id),
          ).join(', ')}`,
        );
      }
  */
      // Validate prixTable length
      if (prixTable.length !== produits.length) {
        throw new Error(`PrixTable length must match Produits length for Cimenterie ID ${cimenterieId}`);
      }
  
      // Add new variations
      for (let i = 0; i < produits.length; i++) {
        const produitPrixVariation = new this.produitPrixVariationModel({
          produit: produits[i],
          cimenterie: cimenterieId,
          visite: visiteId,
          prix: prixTable[i],
        });
  
        const savedProduitPrixVariation = await produitPrixVariation.save();
        allVariations.push(savedProduitPrixVariation);
      }
    }
  
    return allVariations;
  }
  













  findAll() {
    return `This action returns all produitPrixVariation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produitPrixVariation`;
  }

  update(id: number, updateProduitPrixVariationDto: UpdateProduitPrixVariationDto) {
    return `This action updates a #${id} produitPrixVariation`;
  }

  remove(id: number) {
    return `This action removes a #${id} produitPrixVariation`;
  }






// Fetch the Visite with its associated pointDeVente and products
async getVisiteById(id: string) {
  // Step 1: Fetch the pointDeVente information
  const visite = await this.visiteModel.findById(id).exec();
  if (!visite) {
    throw new Error('Visite not found');
  }

  // Step 2: Fetch associated ProduitPrixVariation data (price and product for the visite)
  const produitPrixVariations = await this.produitPrixVariationModel
    .find({ visite: visite._id })
    .populate('produit cimenterie') // Populate the product and cimenterie details
    .exec();

  // Step 3: Group data by cimenterie
  const groupedByCimenterie = produitPrixVariations.reduce((acc, variation) => {
    const cimenterieId = variation.cimenterie._id.toString(); // Use cimenterie ID as key
    const produitId = variation.produit._id; // Store the product ID
    const produitPrice = variation.prix;

    if (!acc[cimenterieId]) {
      acc[cimenterieId] = {}; // Initialize the cimenterie if not already present
    }

    acc[cimenterieId][produitId] = produitPrice; // Add product ID and price to the cimenterie group

    return acc;
  }, {});

  // Step 4: Fetch cimenterie names
  const cimenterieIds = Object.keys(groupedByCimenterie);
  const cimenteriePromises = cimenterieIds.map((id) => this.CimenterieModel.findById(id).exec());
  const cimenteries = await Promise.all(cimenteriePromises);

  // Step 5: Fetch product names from the ProductModel based on product IDs
  const allProduitIds = [].concat(...Object.values(groupedByCimenterie).map((produits) => Object.keys(produits)));
  const uniqueProduitIds = [...new Set(allProduitIds)]; // Remove duplicates

  const produitPromises = uniqueProduitIds.map((produitId) => this.ProduitModel.findById(produitId).exec());
  const produits = await Promise.all(produitPromises);
  
  // Create a mapping of product ID to product name for easier lookup
  const produitNameMap = produits.reduce((acc, produit) => {
    acc[produit._id.toString()] = produit.designation; // Assuming 'name' is the field in the ProductModel
    return acc;
  }, {});
var pointventeName = (await this.PointVenteModel.findById(visite.pointvente)).name
  // Step 6: Map the grouped data to include cimenterie names and product names
  const result = {
    pointDeVente: pointventeName, // Assuming pointDeVente is in Visite
    visiteId: visite._id,
    date: visite.date,
    observation: visite.observation,
    cimentries: cimenteries.map((cimenterie, index) => ({
      cimenterieName: cimenterie.name, // Use the cimenterie name instead of ID
      produits: Object.keys(groupedByCimenterie[cimenterieIds[index]]).map((produitId) => ({
        produitName: produitNameMap[produitId], // Fetch the product name from the map
        prix: groupedByCimenterie[cimenterieIds[index]][produitId], // Get the product price
      })),
    })),
  };

  return result;
}


}
