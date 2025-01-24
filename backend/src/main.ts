import * as dotenv from 'dotenv'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync(path.join(__dirname, '../../../certs/cert.key')), // Path to key
      cert: fs.readFileSync(path.join(__dirname, '../../../certs/cert.crt')), // Path to certificate
    },
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
      stopAtFirstError: true, // เพิ่ม option นี้
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints)[0] + '.', // บรรทัดนี้สำคัญ
        }))
        return new BadRequestException({ errors: messages })
      },
    })
  )

  app.setGlobalPrefix('api') // ตั้งค่า prefix /api

  const config = new DocumentBuilder()
    .setTitle('Datawow - Webboard')
    .setDescription('API documentation for my NestJS application')
    .setVersion('1.0')
    .addTag('users')
    .addTag('posts')
    .addTag('comments')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document) // Swagger จะอยู่ที่ /swagger

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`Application is running on: https://localhost:${port}`) // แสดง https ใน console
}

bootstrap()
