/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './User/Schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user/user.controller';
import { VisiteModule } from './visite/visite.module';
import { PointventeModule } from './pointvente/pointvente.module';
import { MailModule } from './Service/mail.module';
import { ProduitPrixVariation } from './produit-prix-variation/entities/produit-prix-variation.entity';
import { Produit } from './produit/entities/produit.entity';
import { ProduitModule } from './produit/produit.module';
import { ProduitPrixVariationModule } from './produit-prix-variation/produit-prix-variation.module';
import { CimenterieModule } from './cimenterie/cimenterie.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hackathon'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Vous pouvez utiliser une clé secrète stockée dans .env
      signOptions: { expiresIn: '1h' }, 
    }),
    VisiteModule,
    PointventeModule,
    MailModule,
    ProduitPrixVariationModule,
    ProduitModule,
    CimenterieModule,UserModule
  ],
  controllers: [UserController], 

  providers: [UserService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.initializeAdmin();
  }

  private async initializeAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@default.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
    const existingAdmin = await this.userService.findByEmail(adminEmail);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await this.userService.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'Admin',
      });
      console.log(`Admin user (${adminEmail}) created successfully`);
    } else {
      console.log(`Admin user (${adminEmail}) already exists`);
    }
  }
}
