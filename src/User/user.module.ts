/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './Schema/user.schema';
import { Visite, VisiteSchema } from 'src/visite/entities/visite.entity';
import { MailModule } from 'src/Service/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Visite.name, schema: VisiteSchema }]),
    JwtModule.register({
      secret: 'yourSecretKey', // Remplacez par une clé secrète sécurisée
      signOptions: { expiresIn: '1h' }, // Durée de validité du token
    }),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
