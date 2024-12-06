/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CimenterieService } from './cimenterie.service';
import { CimenterieController } from './cimenterie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cimenterie,CimenterieSchema } from './entities/cimenterie.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cimenterie.name, schema: CimenterieSchema },

    ]),
  ],
  controllers: [CimenterieController],
  providers: [CimenterieService],
})
export class CimenterieModule {}
