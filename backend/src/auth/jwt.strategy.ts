import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { PrismaService } from '../prisma/prisma.service'
import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'yourSecretKey', // ควรเก็บใน .env
    })
  }

  async validate(payload: any) {
    // ตรวจสอบ user จาก payload (เช่น หา user จาก id ใน payload)
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    })
    if (!user) {
      return false
    }
    return user // ส่ง user object กลับไปให้ request (req.user)
  }
}
