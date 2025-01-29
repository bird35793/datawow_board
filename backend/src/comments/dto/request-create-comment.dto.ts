// src/comments/dto/request-create-comment.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RequestCreateCommentDto {
  @ApiProperty({ description: 'เนื้อหา Comment' })
  @IsString({ message: 'Content ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอก Content' })
  content: string

  @ApiProperty({ description: 'ไอดีโพสต์' })
  @IsNumber({}, { message: 'PostId ต้องเป็นตัวเลข' })
  @IsNotEmpty({ message: 'กรุณากรอก PostId' })
  postId: number
}
