// src/posts/dto/response-create-post.dto.ts
import { Expose } from 'class-transformer'
import { ResponsePostDto } from './response-post.dto'

export class ResponseCreatePostDto extends ResponsePostDto {
  @Expose()
  createdAt: Date

  @Expose()
  createdByDisplayName: string
}
