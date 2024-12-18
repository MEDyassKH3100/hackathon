import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Enable CORS with wildcard origin
   app.enableCors({
    origin: '*', // Allows all origins to make requests
  });
  dotenv.config();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();