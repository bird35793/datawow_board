// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { plainToInstance } from 'class-transformer'
import { ResponseCreatePostDto } from './dto/response-create-post.dto'
import { ResponseSelectPostDto } from './dto/response-select-post.dto'
import { ResponseUpdatePostDto } from './dto/response-update-post.dto'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const createdPost = await this.prisma.post.create({
        data: createPostDto,
        include: {
          author: { select: { displayName: true } },
          createdByUser: { select: { displayName: true } },
        },
      })

      return plainToInstance(ResponseCreatePostDto, {
        ...createdPost,
        authorDisplayName: createdPost.author.displayName,
        createdByDisplayName: createdPost.createdByUser?.displayName ?? null,
      })
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
        },
      })

      return posts.map((post) =>
        plainToInstance(ResponseSelectPostDto, {
          ...post,
          authorDisplayName: post.author.displayName,
          createdByDisplayName: post.createdByUser?.displayName ?? null,
          updatedByDisplayName: post.updatedByUser?.displayName ?? null,
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
        },
      })
      if (!post) {
        throw new NotFoundException('ไม่พบโพสต์')
      }
      return plainToInstance(ResponseSelectPostDto, {
        ...post,
        authorDisplayName: post.author.displayName,
        createdByDisplayName: post.createdByUser?.displayName ?? null,
        updatedByDisplayName: post.updatedByUser?.displayName ?? null,
      })
    } catch (error) {
      console.error('Error finding post:', error)
      throw error
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
        include: { updatedByUser: { select: { displayName: true } } },
      })
      if (!updatedPost) {
        throw new NotFoundException('ไม่พบโพสต์')
      }
      return plainToInstance(ResponseUpdatePostDto, {
        ...updatedPost,
        updatedByDisplayName: updatedPost.updatedByUser?.displayName ?? null,
      })
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
