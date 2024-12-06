/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PointventeService } from './pointvente.service';
import { PointventeController } from './pointvente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Visite, VisiteSchema } from 'src/visite/entities/visite.entity';
import { User, UserSchema } from 'src/user/Schema/user.schema';
import { Pointvente, PointventeSchema } from './entities/pointvente.entity';

@Module({
  imports: [
  MongooseModule.forFeature([
    { name: Visite.name, schema: VisiteSchema },
    { name: User.name, schema: UserSchema },
    { name: Pointvente.name, schema: PointventeSchema },

  ])],
  controllers: [PointventeController],
  providers: [PointventeService],
})
export class PointventeModule {}
