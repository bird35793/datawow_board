import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { RequestCreateCommentDto } from './dto/request-create-comment.dto'
import { RequestUpdateCommentDto } from './dto/request-update-comment.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { plainToInstance } from 'class-transformer'
import { ResponseCreateCommentDto } from './dto/response-create-comment.dto'
import { ResponseSelectCommentDto } from './dto/response-select-comment.dto'
import { ResponseUpdateCommentDto } from './dto/response-update-comment.dto'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: RequestCreateCommentDto, userId: number) {
    try {
      const createdComment = await this.prisma.comment.create({
        data: {
          ...createCommentDto,
          createdBy: userId,
        },
        include: {
          user: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
        },
      })

      return plainToInstance(ResponseCreateCommentDto, createdComment)
    } catch (error) {
      console.error('Error creating comment:', error)

      if (error.code === 'P2003') {
        // ตรวจสอบ field ที่ทำให้เกิด error P2003 อย่างละเอียด
        const target = error.meta?.target as string[]
        let errorMessage = 'ข้อมูลอ้างอิงไม่ถูกต้อง'
        if (target) {
          if (target.includes('postId')) {
            errorMessage = 'postId ไม่ถูกต้อง'
          } else if (target.includes('userId')) {
            errorMessage = 'userId ไม่ถูกต้อง'
          }
          // เพิ่มการตรวจสอบ field อื่นๆ ที่อาจทำให้เกิด P2003 ได้ เช่น parentCommentId
          else if (target.includes('parentCommentId')) {
            errorMessage = 'parentCommentId ไม่ถูกต้อง'
          }
        }

        throw new BadRequestException({
          errors: [
            {
              field: target?.join(', ') || 'ข้อมูลอ้างอิง', // แสดง field ที่มีปัญหา หรือ 'ข้อมูลอ้างอิง' ถ้าไม่ทราบ field
              message: errorMessage,
            },
          ],
        })
      } else if (error.code === 'P2002') {
        // กรณี unique constraint violation (ถ้ามี)
        const target = error.meta?.target as string[]
        let errorMessage = 'ข้อมูลซ้ำ'
        if (target) {
          errorMessage = `${target.join(', ')} นี้มีอยู่แล้ว`
        }
        throw new BadRequestException({
          errors: [
            {
              field: target?.join(', ') || 'ข้อมูล',
              message: errorMessage,
            },
          ],
        })
      }

      throw error // Re-throw error อื่นๆ
    }
  }

  async findAll() {
    try {
      const comments = await this.prisma.comment.findMany({
        include: {
          user: { select: { displayName: true } },
          post: { select: { title: true } },
          createdByUser: { select: { displayName: true } },
          updatedByUser: { select: { displayName: true } },
        },
      })

      return comments.map((comment) =>
        plainToInstance(ResponseSelectCommentDto, comment)
      )
    } catch (error) {
      console.error('Error finding comments:', error)
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
        include: {
          user: { select: { displayName: true } },
          post: { select: { title: true } },
          createdByUser: { select: { displayName: true } },
          updatedByUser: { select: { displayName: true } },
        },
      })
      if (!comment) {
        throw new NotFoundException('ไม่พบ Comment')
      }
      return plainToInstance(ResponseSelectCommentDto, comment)
    } catch (error) {
      console.error('Error finding comment:', error)
      throw error
    }
  }

  async update(
    id: number,
    updateCommentDto: RequestUpdateCommentDto,
    userId: number
  ) {
    // เพิ่ม userId
    try {
      const existingComment = await this.prisma.comment.findUnique({
        where: { id },
      })
      if (!existingComment) {
        throw new NotFoundException('ไม่พบ Comment')
      }

      const updatedComment = await this.prisma.comment.update({
        where: { id },
        data: {
          ...updateCommentDto,
          updatedBy: userId, // เพิ่ม updatedBy
          updatedAt: new Date(), // หรือใช้ @updatedAt ใน schema
        },
        include: { updatedByUser: { select: { displayName: true } } },
      })

      return plainToInstance(ResponseUpdateCommentDto, updatedComment)
    } catch (error) {
      console.error('Error updating comment:', error)

      if (error.code === 'P2025') {
        throw new NotFoundException('ไม่พบ Comment')
      } else if (error.code === 'P2002') {
        // จัดการ unique constraint violation (ถ้ามี)
        const target = error.meta?.target as string[]
        let errorMessage = 'ข้อมูลซ้ำ'
        if (target) {
          errorMessage = `${target.join(', ')} นี้มีอยู่แล้ว`
        }
        throw new BadRequestException({
          errors: [
            {
              field: target?.join(', ') || 'ข้อมูล',
              message: errorMessage,
            },
          ],
        })
      }

      throw error // Re-throw error อื่นๆ
    }
  }

  async remove(id: number) {
    try {
      const existingComment = await this.prisma.comment.findUnique({
        where: { id },
      })
      if (!existingComment) {
        throw new NotFoundException('ไม่พบ Comment')
      }
      const deletedComment = await this.prisma.comment.delete({ where: { id } })
      return { message: 'ลบ Comment สำเร็จ' }
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  }
}
