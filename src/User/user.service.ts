import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './Schema/user.schema';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { CreateCommercialDto } from './Dto/create-commercial.dto';
import { CreateUserDto } from './Dto/create-user.dto';
import { UpdateCommercialDto } from './Dto/update-commercial.dto';
import { ChangePasswordDto } from './Dto/change-password.dto';
dotenv.config();

const defaultEmail = process.env.ADMIN_EMAIL;
const defaultPassword = process.env.ADMIN_PASSWORD;


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  private jwtService: JwtService,
) {}



 // Fonction de connexion
 async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const payload = { email: user.email, role: user.role, sub: user._id };
    const token = this.jwtService.sign(payload);

    return { token };
  }


  // Créer un utilisateur (Admin ou Commercial)
  async createUser(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }


  // Créer un admin statique
  async initializeDefaultAdmin() {
    const defaultEmail = 'admin@default.com';
    const defaultPassword = 'admin123'; // Mot de passe par défaut

    const existingAdmin = await this.userModel.findOne({ email: defaultEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const adminData = {
        email: defaultEmail,
        password: hashedPassword,
        role: 'Admin',
      };
      const admin = new this.userModel(adminData);
      await admin.save();
      console.log('Admin par défaut créé :', defaultEmail);
    } else {
      console.log('Admin par défaut existe déjà.');
    }
  }

  // Créer un commercial (par un admin uniquement)
  async createCommercial(
    adminRole: string,
    createCommercialDto: CreateCommercialDto,
  ): Promise<User> {
    if (adminRole !== 'Admin') {
      throw new UnauthorizedException('Seul un Admin peut créer des commerciaux.');
    }
  
    const { email, password, nom, prenom, telephone, equipeRegionale } = createCommercialDto;
  
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UnauthorizedException('Cet email est déjà utilisé.');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newCommercial = new this.userModel({
      email,
      password: hashedPassword,
      role: 'Commercial',
      nom,
      prenom,
      telephone,
      equipeRegionale,
    });
  
    return newCommercial.save();
  }
  
  

  // Récupérer tous les utilisateurs par rôle
  async findUsersByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  // Supprimer un utilisateur
  async deleteUser(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
  }
// trouver un user à l'aide de son Email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  // créer un USER
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }


// Update Commerciale 
async updateProfile(userId: string, updateProfileDto: UpdateCommercialDto): Promise<User> {
  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new NotFoundException(`User with ID "${userId}" not found`);
  }

  // Mettez à jour les champs de l'utilisateur avec les valeurs du DTO
  Object.assign(user, updateProfileDto);
  await user.save();

  return user;
}

async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<User> {
  const { oldPassword, newPassword } = changePasswordDto;

  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new NotFoundException(`User with ID "${userId}" not found`);
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    throw new UnauthorizedException('Old password is incorrect');
  }

  const saltRounds = 10;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  user.password = hashedNewPassword;
  await user.save();

  return user;
}


}