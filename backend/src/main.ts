import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // import dotenv
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config(); // โหลดตัวแปรจาก .env
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // เพิ่ม ValidationPipe
  const port = process.env.PORT || 3000; // กำหนด port โดยอ่านจาก .env หรือใช้ 3000 เป็นค่า default
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`); // แสดง port ที่ใช้ใน console
}
bootstrap();
