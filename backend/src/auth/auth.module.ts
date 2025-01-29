import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy' // เพิ่มถ้าใช้ local strategy

import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'yourSecretKey', // ควรเก็บใน .env
      signOptions: { expiresIn: process.env.EXPIRES_IN ?? '60s' }, // ตั้งค่า expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy], // เพิ่ม LocalStrategy ถ้าใช้
  controllers: [AuthController],
  exports: [AuthService], // ถ้าต้องการใช้ AuthService ที่อื่น
})
export class AuthModule {}
