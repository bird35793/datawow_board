import * as bcrypt from 'bcrypt'
import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { RequestCreateAuthDto } from './dto/request-create-auth.dto'
import { ResponseLoginAuthDto } from './dto/response-login-auth.dto'
import { User } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(user: User): Promise<ResponseLoginAuthDto> {
    // เปลี่ยน return type เป็น Promise<ResponseLoginAuthDto>
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        displayName: user.displayName, // ส่ง displayName ใน user object
      },
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    })
    
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async register(createUserDto: RequestCreateAuthDto) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10)
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds)
    try {
      const user = await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          password: hashedPassword,
          displayName: createUserDto.displayName,
          email: createUserDto.email,
        },
      })
      const { password, ...result } = user
      return result
      // return {
      //   username: user.username,
      //   email: user.email
      // }
    } catch (error) {
      if (error.code === 'P2002') {
        // Unique constraint failed
        throw new ConflictException('Username already exists')
      }
      throw error
    }
  }
}
