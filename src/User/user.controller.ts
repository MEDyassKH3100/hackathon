import { Controller, Post, Body, Get, Req, Delete, Param, UnauthorizedException, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './Schema/user.schema';
import { LoginDto } from './Dto/login.dto';
import { CreateCommercialDto } from './Dto/create-commercial.dto';
import { Roles } from 'src/Role/roles.decorator';
import { RolesGuard } from 'src/Role/roles.guard';
import { AuthGuard } from 'src/Guards/auth.guard';
import { UpdateCommercialDto } from './Dto/update-commercial.dto';
import { ChangePasswordDto } from './Dto/change-password.dto';

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
  async createCommercial(@Req() req, @Body() createCommercialDto: CreateCommercialDto) {
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

  @Put('update-profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateCommercialDto,
  ) {
    const userId = req.user.id; // Récupère l'ID de l'utilisateur connecté à partir du JWT
    return this.userService.updateProfile(userId, updateProfileDto);
  }

  @Put('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user.id; // Récupère l'ID de l'utilisateur connecté à partir du JWT
    return this.userService.changePassword(userId, changePasswordDto);
  }
}
