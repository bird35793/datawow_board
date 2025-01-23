import * as dotenv from 'dotenv'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

async function bootstrap() {
  dotenv.config()

  const httpsOptions =
    process.env.NODE_ENV === 'production'
      ? null // Don't use HTTPS in production if a reverse proxy handles it
      : {
          key: fs.readFileSync(path.join(__dirname, './localhost-key.pem')),
          cert: fs.readFileSync(path.join(__dirname, './localhost.pem')),
        }

  const app = await NestFactory.create(AppModule, { httpsOptions })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
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
