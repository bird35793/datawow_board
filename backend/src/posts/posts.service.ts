// src/posts/posts.service.ts
import {
  BadRequestException,
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

  async create(createPostDto: RequestCreatePostDto) {
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
        data: createPostDto,
        include: {
          author: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
        },
      })

      return plainToInstance(ResponseCreatePostDto, createdPost)
    } catch (error) {
      if (error.code === 'P2002') {
        // จัดการกรณีชื่อเรื่องที่ซ้ำกัน
        // Option 1: สร้างชื่อเรื่องที่ไม่ซ้ำกันโดยอัตโนมัติ (ถ้าสามารถทำได้)
        createPostDto.title = createPostDto.title + '-duplicate'
        // ลองสร้างโพสต์อีกครั้งด้วยชื่อเรื่องที่ปรับเปลี่ยน
        return await this.create(createPostDto) // เรียกซ้ำแบบ recursion

        // Option 2: ส่งกลับข้อผิดพลาดแบบ custom ไปยัง client
        throw new HttpException(
          'พบชื่อเรื่องที่ซ้ำกัน กรุณาเลือกชื่อเรื่องที่ไม่ซ้ำกัน',
          HttpStatus.BAD_REQUEST
        )
      } else {
        // ส่งต่อข้อผิดพลาดอื่น
        throw error
      }
    }
  }

  async findAll() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          author: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
          updatedByUser: { select: { displayName: true } },
        },
      })

      return posts.map((post) =>
        plainToInstance(ResponseSelectPostDto, post)
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
        },
      })
      if (!post) {
        throw new NotFoundException('ไม่พบโพสต์')
      }
      return plainToInstance(ResponseSelectPostDto, post)
    } catch (error) {
      console.error('Error finding post:', error)
      throw error
    }
  }

  async update(id: number, updatePostDto: RequestUpdatePostDto) {
    try {
      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
        include: { updatedByUser: { select: { displayName: true } } },
      })
      if (!updatedPost) {
        throw new NotFoundException('ไม่พบโพสต์')
      }
      return plainToInstance(ResponseUpdatePostDto, updatedPost )
    } catch (error) {
      console.error('Error updating post:', error)
      throw error
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
