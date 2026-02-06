import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Ambil daftar origin dari .env
  const allowedOrigins = configService.get<string>('CORS_ORIGIN')?.split(',') || [];

  //  Aktifkan CORS untuk semua domain (termasuk React)
  app.enableCors({
    origin: allowedOrigins, // Pakai variabel dari .env
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Aktifkan jika pakai cookie/token
  });

  const BACKEND_PORT = configService.get<string>('BACKEND_PORT') || '3001';

  await app.listen(BACKEND_PORT);
  console.log(`Server running on http://localhost:${BACKEND_PORT}`);
}
bootstrap();
