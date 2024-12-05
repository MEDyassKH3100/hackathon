import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './Schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'yourSecretKey', // Remplacez par une clé secrète sécurisée
      signOptions: { expiresIn: '1h' }, // Durée de validité du token
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
