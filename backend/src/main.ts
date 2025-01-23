import * as dotenv from 'dotenv'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
// import dotenv

async function bootstrap() {
  dotenv.config() // โหลดตัวแปรจาก .env
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ลบ properties ที่ไม่มีใน DTO ออก
      transform: true, // แปลง type ตาม DTO
      forbidNonWhitelisted: true, // แจ้ง error ถ้ามี properties เกิน
      transformOptions: {
        enableImplicitConversion: true, // เปิดใช้งาน type conversion
      },
    })
  )

  // Config Swagger
  const config = new DocumentBuilder()
    .setTitle('Datawow - Webboard')
    .setDescription('API documentation for my NestJS application')
    .setVersion('1.0')
    .addTag('users') // เพิ่ม tag (ถ้าต้องการ)
    .addTag('posts')
    .addTag('comments')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document) // ตั้งค่า path ของ swagger เป็น /api

  const port = process.env.PORT || 3000 // กำหนด port โดยอ่านจาก .env หรือใช้ 3000 เป็นค่า default
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`) // แสดง port ที่ใช้ใน console
}
bootstrap()
