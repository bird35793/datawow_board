// src/posts/dto/response-post.dto.ts (Base DTO)
import { User } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer'

export class ResponsePostDto {
  @Expose()
  id: number

  @Expose()
  title: string

  @Expose()
  content: string

  @Expose()
  isActive: boolean

  @Exclude()
  author: User // Exclude the entire author object

  @Exclude()
  createdByUser: User

  @Exclude()
  updatedByUser: User

  @Exclude()
  createdBy: number

  @Exclude()
  updatedBy: number

  @Exclude()
  authorId: number

  @Expose()
  authorDisplayName: string
}
