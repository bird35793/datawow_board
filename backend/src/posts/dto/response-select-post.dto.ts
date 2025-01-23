// src/posts/dto/response-select-post.dto.ts
import { Expose } from 'class-transformer'
import { ResponsePostDto } from './response-post.dto'

export class ResponseSelectPostDto extends ResponsePostDto {
  @Expose()
  createdAt: Date

  @Expose()
  updatedAt?: Date

  @Expose()
  createdByDisplayName: string

  @Expose()
  updatedByDisplayName: string
}
