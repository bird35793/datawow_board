// src/posts/dto/response-update-post.dto.ts
import { Expose } from 'class-transformer'
import { ResponsePostDto } from './response-post.dto'

export class ResponseUpdatePostDto extends ResponsePostDto {
  @Expose()
  updatedAt: Date

  @Expose()
  updatedByDisplayName: string
}
