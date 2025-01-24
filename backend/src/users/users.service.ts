import { RequestCreateUserDto } from './dto/request-create-user.dto'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'src/prisma/prisma.service'
import { RequestUpdateUserDto } from './dto/request-update-user.dto'
import { ResponseCreateUserDto } from './dto/response-create-user.dto'
import { ResponseSelectUserDto } from './dto/response-select-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(requestCreateUserDto: RequestCreateUserDto) {
    try {
      // 1. ตรวจสอบ username หรือ email ที่ซ้ำกัน
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            // ใช้ OR เพื่อตรวจสอบทั้ง username และ email
            { username: requestCreateUserDto.username },
            { email: requestCreateUserDto.email },
          ],
        },
      })

      if (existingUser) {
        // ตรวจสอบว่าซ้ำที่ title หรือ content
        const duplicateField =
          existingUser.username === requestCreateUserDto.username
            ? 'username'
            : 'email'
        const message =
          duplicateField === 'username'
            ? 'Username นี้มีอยู่แล้ว กรุณาใช้ Username อื่น'
            : 'Email นี้มีอยู่แล้ว กรุณาใช้ Email อื่น'

        throw new BadRequestException({
          errors: [
            {
              field: duplicateField,
              message: message,
            },
          ],
        })
      }

      // 2. สร้าง user (ไม่ต้อง include relations)
      const createdUser = await this.prisma.user.create({
        data: requestCreateUserDto,
      })

      // 3. ดึง user พร้อม createdByDisplayName หลังจาก create
      const userWithDisplayName = await this.prisma.user.findUnique({
        where: { id: createdUser.id },
        include: {
          createdByUser: {
            select: { displayName: true },
          },
        },
      })

      if (!userWithDisplayName) {
        throw new Error('User created but could not be retrieved.')
      }
      // 4. แปลงเป็น DTO ด้วย plainToInstance และ exposeUnsetFields: false
      const response = plainToInstance(
        ResponseCreateUserDto,
        {
          ...userWithDisplayName,
          createdByDisplayName:
            userWithDisplayName.createdByUser?.displayName ?? null,
        },
        { exposeUnsetFields: false }
      )

      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          createdByUser: { select: { displayName: true } },
          updatedByUser: { select: { displayName: true } },
        },
      })

      // แปลงแต่ละ user ใน array ด้วย plainToInstance
      const responses = users.map((user) =>
        plainToInstance(ResponseSelectUserDto, {
          ...user,
          createdByDisplayName: user.createdByUser?.displayName ?? null,
          updatedByDisplayName: user.updatedByUser?.displayName ?? null,
        })
      )

      return responses
    } catch (error) {
      console.error('Error finding users:', error)
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          createdByUser: { select: { displayName: true } },
          updatedByUser: { select: { displayName: true } },
        },
      })

      if (!user) {
        throw new NotFoundException('ไม่พบผู้ใช้')
      }

      const response = plainToInstance(ResponseSelectUserDto, {
        ...user,
        createdByDisplayName: user.createdByUser?.displayName ?? null,
        updatedByDisplayName: user.updatedByUser?.displayName ?? null,
      })

      return response
    } catch (error) {
      console.error('Error finding user:', error)
      throw error
    }
  }

  async update(id: number, requestUpdateUserDto: RequestUpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: requestUpdateUserDto,
      })

      return plainToInstance(ResponseCreateUserDto, updatedUser)
    } catch (error) {
      throw new NotFoundException('ไม่พบผู้ใช้')
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({ where: { id } })
      return plainToInstance(ResponseCreateUserDto, deletedUser)
    } catch (error) {
      throw new NotFoundException('ไม่พบผู้ใช้')
    }
  }
}
