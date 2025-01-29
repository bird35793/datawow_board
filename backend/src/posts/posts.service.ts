// src/posts/posts.service.ts
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { RequestCreatePostDto } from './dto/request-create-post.dto'
import { RequestUpdatePostDto } from './dto/request-update-post.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { plainToInstance } from 'class-transformer'
import { ResponseCreatePostDto } from './dto/response-create-post.dto'
import { ResponseSelectPostDto } from './dto/response-select-post.dto'
import { ResponseUpdatePostDto } from './dto/response-update-post.dto'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: RequestCreatePostDto, userId: number) {
    try {
      const existingPost = await this.prisma.post.findFirst({
        where: {
          OR: [{ title: createPostDto.title }],
        },
      })

      if (existingPost) {
        throw new BadRequestException({
          errors: [
            {
              field: 'Title',
              message: 'Title นี้มีอยู่แล้ว กรุณาใช้ Title อื่น',
            },
          ],
        })
      }

      const createdPost = await this.prisma.post.create({
        data: {
          ...createPostDto,
          authorId: userId,
          createdBy: userId,
        },
        include: {
          author: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
        },
      })

      return plainToInstance(ResponseCreatePostDto, createdPost)
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  async findAll() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          author: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
          updatedByUser: { select: { displayName: true } },
          comments: true, // ดึง comments มาด้วยเลย
        },
      })

      return posts.map((post) =>
        plainToInstance(ResponseSelectPostDto, {
          ...post,
          commentCount: post.comments.length,
        })
      )
    } catch (error) {
      console.error('Error finding posts:', error)
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          author: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
          updatedByUser: { select: { displayName: true } },
          comments: true, // ดึง comments มาด้วยเลย
        },
      })
      if (!post) {
        throw new NotFoundException('ไม่พบโพสต์')
      }

      const postWithCommentCount = {
        ...post,
        commentCount: post.comments.length, // นับจำนวน comments
      }

      return plainToInstance(ResponseSelectPostDto, postWithCommentCount)
    } catch (error) {
      console.error('Error finding post:', error)
      throw error
    }
  }

  async update(
    id: number,
    updatePostDto: RequestUpdatePostDto,
    userId: number
  ) {
    let duplicateField = ''
    let message = ''
    try {
      const existingPost = await this.prisma.post.findUnique({ where: { id } })
      if (!existingPost) {
        throw new NotFoundException('ไม่พบโพสต์')
      }

      // ตรวจสอบ title ที่ซ้ำกัน โดยยกเว้น id ของตัวเอง
      const conflictingPost = await this.prisma.post.findFirst({
        where: {
          AND: [
            { title: updatePostDto.title }, // ตรวจสอบ title
            { NOT: { id } }, // ยกเว้น id ของตัวเอง
          ],
        },
      })

      if (conflictingPost) {
        duplicateField = 'title'
        message = 'Title นี้มีอยู่แล้ว กรุณาใช้ Title อื่น'

        throw new BadRequestException({
          errors: [
            {
              field: duplicateField,
              message: message,
            },
          ],
        })
      }

      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: {
          ...updatePostDto,
          updatedBy: userId,
          updatedAt: new Date(), // หรือใช้ @updatedAt ใน schema
        },
        include: { updatedByUser: { select: { displayName: true } } }, // คง include ไว้
      })

      return plainToInstance(ResponseUpdatePostDto, updatedPost)
    } catch (error) {
      if (message != '') {
        throw new BadRequestException({
          errors: [
            {
              field: duplicateField,
              message: message,
            },
          ],
        })
      } else if (error.code === 'P2025') {
        throw new NotFoundException('ไม่พบโพสต์')
      } else if (error.code === 'P2002') {
        throw new ConflictException('Title นี้มีอยู่แล้ว') // จัดการ P2002 ใน catch block ด้วย
      }
      console.error('Error updating post:', error) // Log error เพื่อ debug
      throw error // Re-throw error เพื่อให้ NestJS จัดการต่อ
    }
  }

  async remove(id: number) {
    try {
      const deletedPost = await this.prisma.post.delete({ where: { id } })
      if (!deletedPost) {
        throw new NotFoundException('ไม่พบโพสต์')
      }
      return deletedPost // No need to transform for delete
    } catch (error) {
      console.error('Error deleting post:', error)
      throw error
    }
  }
}
