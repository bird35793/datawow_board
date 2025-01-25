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

  async create(createCommentDto: RequestCreateCommentDto) {
    try {
      const createdComment = await this.prisma.comment.create({
        data: createCommentDto,
        include: {
          user: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
        },
      })

      return plainToInstance(ResponseCreateCommentDto, createdComment)
    } catch (error) {
      console.error('Error creating comment:', error)
      if (error.code === 'P2003') {
        throw new BadRequestException({
          errors: [
            {
              field: 'postId หรือ userId',
              message: 'postId หรือ userId ไม่ถูกต้อง',
            },
          ],
        })
      }
      throw error
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

  async update(id: number, updateCommentDto: RequestUpdateCommentDto) {
    try {
      const existingComment = await this.prisma.comment.findUnique({
        where: { id },
      })
      if (!existingComment) {
        throw new NotFoundException('ไม่พบ Comment')
      }
      const updatedComment = await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
        include: { updatedByUser: { select: { displayName: true } } },
      })
      return plainToInstance(ResponseUpdateCommentDto, updatedComment)
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error
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
