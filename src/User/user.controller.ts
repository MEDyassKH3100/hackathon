import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Delete,
  Param,
  UnauthorizedException,
  UseGuards,
  Put,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './Schema/user.schema';
import { LoginDto } from './Dto/login.dto';
import { CreateCommercialDto } from './Dto/create-commercial.dto';
import { Roles } from 'src/Role/roles.decorator';
import { RolesGuard } from 'src/Role/roles.guard';
import { AuthGuard } from 'src/Guards/auth.guard';
import { UpdateCommercialDto } from './Dto/update-commercial.dto';
import { ChangePasswordDto } from './Dto/change-password.dto';
import { Request as ExpressRequest } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto; // Extraire email et password depuis le DTO
    return this.userService.login(email, password); // Passer les deux arguments
  }

  // Route pour créer un commercial
  @Post('create-commercial')
  @Roles('Admin') // Restreint aux admins
  @UseGuards(AuthGuard, RolesGuard)
  async createCommercial(
    @Req() req,
    @Body() createCommercialDto: CreateCommercialDto,
  ) {
    const adminRole = req.user.role; // Récupère le rôle depuis le JWT
    return this.userService.createCommercial(adminRole, createCommercialDto);
  }

  // Route pour récupérer tous les commerciaux
  @Get('commercials')
  async getCommercials() {
    return this.userService.findUsersByRole('Commercial');
  }

  // Route pour supprimer un utilisateur
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  // Mise à jour du profil pour le commercial connecté

  @UseGuards(AuthGuard)
  @Put('update-profile')
  async updateProfile(
    @Req() req,
    @Body() updateCommercialDto: UpdateCommercialDto,
  ) {
    console.log('Utilisateur connecté :', req.user); // Log for debugging
    const userId = req.user?.sub; // Access the user ID from the payload (sub)
    if (!userId) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    return this.userService.updateProfile(userId, updateCommercialDto);
  }

  // Changer le mot de passe pour le commercial connecté
  @Put('change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user?.sub; // Récupérer l'id de l'utilisateur connecté depuis le JWT
    return this.userService.changePassword(userId, changePasswordDto);
  }

  @UseGuards(AuthGuard, RolesGuard) // Garder AuthGuard et le gardien des rôles
  @Roles('Admin') // Accès réservé aux administrateurs
  @Get('commercials')
  async getAllCommercials() {
    return this.userService.getAllCommercials();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Get('commercials/:id')
  async getOneCommercial(@Param('id') id: string) {
    return this.userService.getOneCommercial(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin') // Accès réservé aux administrateurs
  @Patch('ban-commercial/:id')
  async banCommercial(@Param('id') id: string) {
    return this.userService.banCommercial(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin') // Accès réservé aux administrateurs
  @Patch('Active-commercial/:id')
  async ActiveCommercial(@Param('id') id: string) {
    return this.userService.ActiveCommercial(id);
  } 


  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.userService.forgotPassword(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('otp') otp: number) {
    return this.userService.verifyOtp(otp);
  }

  @Put('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: { userId: string; newPassword: string },
  ) {
    return this.userService.resetPassword(
      resetPasswordDto.userId,
      resetPasswordDto.newPassword,
    );
  }


}
