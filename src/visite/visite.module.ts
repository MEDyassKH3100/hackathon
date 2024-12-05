/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VisiteService } from './visite.service';
import { VisiteController } from './visite.controller';
import { Visite, VisiteSchema } from './entities/visite.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/Schema/user.schema';

@Module({


  imports: [
    MongooseModule.forFeature([
      { name: Visite.name, schema: VisiteSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [VisiteController],
  providers: [VisiteService],
})
export class VisiteModule {}
