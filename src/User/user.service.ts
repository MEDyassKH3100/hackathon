import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { MailService } from 'src/Service/mail.service';
dotenv.config();

const defaultEmail = process.env.ADMIN_EMAIL;
const defaultPassword = process.env.ADMIN_PASSWORD;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  // Fonction de connexion
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    if (user.isBanned) {
      throw new UnauthorizedException('Votre compte a été banni');
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
      throw new UnauthorizedException(
        'Seul un Admin peut créer des commerciaux.',
      );
    }

    const { email, password, nom, prenom, telephone, equipeRegionale } =
      createCommercialDto;

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

  async updateProfile(
    userId: string,
    updateCommercialDto: UpdateCommercialDto,
  ): Promise<User> {
    // Find the user by ID
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Check if the user has the 'Commercial' role
    if (user.role !== 'Commercial') {
      throw new UnauthorizedException(
        'Seuls les commerciaux peuvent mettre à jour leur profil',
      );
    }

    // Update the user's profile
    Object.assign(user, updateCommercialDto);
    await user.save();

    return user;
  }

  // Change password Commerciale
  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException(`User with ID "${userId}" not found`);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException("L'ancien mot de passe est incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10); // Hachage du nouveau mot de passe
    await user.save();
  }

  // Récupérer tous les commerciaux
  async getAllCommercials(): Promise<User[]> {
    return this.userModel.find({ role: 'Commercial' }).exec();
  }

  // Récupérer un commercial par ID
  async getOneCommercial(id: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: id, role: 'Commercial' })
      .exec();
    if (!user) {
      throw new NotFoundException(`Commercial avec l'ID "${id}" introuvable`);
    }
    return user;
  }

  // Bannir un commercial
  async banCommercial(userId: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: userId, role: 'Commercial' })
      .exec();

    if (!user) {
      throw new NotFoundException(
        `Commercial avec l'ID "${userId}" introuvable`,
      );
    }

    if (user.isBanned) {
      throw new BadRequestException(`Le commercial est déjà banni`);
    }

    user.isBanned = true; // Mise à jour de l'état de bannissement
    await user.save();

    return user;
  }

  // Active un commercial
  async ActiveCommercial(userId: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: userId, role: 'Commercial' })
      .exec();

    if (!user) {
      throw new NotFoundException(
        `Commercial avec l'ID "${userId}" introuvable`,
      );
    }

    user.isBanned = false; 
    await user.save();

    return user;
  }

    // Étape 1 : Oublier le mot de passe et envoyer un OTP
    async forgotPassword(email: string) {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('Utilisateur introuvable.');
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000); // Génère un OTP à 6 chiffres
      const otpExpire = new Date();
      otpExpire.setMinutes(otpExpire.getMinutes() + 10); // Expire dans 10 minutes
  
      user.otp = otp.toString();
      user.otpExpire = otpExpire;
      await user.save();
  
      await this.mailService.sendOtpEmail(email, otp);
  
      return { message: 'Un OTP a été envoyé à votre adresse email.', userId: user._id };
    }
     // Étape 2 : Vérifier l'OTP
  async verifyOtp(otp: number) {
    const user = await this.userModel.findOne({
      otp,
      otpExpire: { $gte: new Date() }, // Vérifie si l'OTP n'est pas expiré
    });

    if (!user) {
      throw new BadRequestException('OTP invalide ou expiré.');
    }

    user.otpVerified = true;
    user.otp = null; // Supprime l'OTP après vérification
    user.otpExpire = null;
    await user.save();

    return { message: 'OTP vérifié avec succès.', userId: user._id };
  }
    // Étape 3 : Réinitialiser le mot de passe
    async resetPassword(userId: string, newPassword: string) {
      const user = await this.userModel.findOne({
        _id: userId,
        otpVerified: true, // Vérifie que l'OTP a été vérifié
      });
  
      if (!user) {
        throw new UnauthorizedException('La vérification de l’OTP est requise.');
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      user.otpVerified = false; // Réinitialise le statut
      await user.save();
  
      return { message: 'Votre mot de passe a été réinitialisé avec succès.' };
    }

}