import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  ResponseCommentDto,
  CommentPostDto,
  CommentUserDto,
} from './response-comment.dto' // Import Base DTO

export class ResponseSelectCommentDto extends ResponseCommentDto {
  @Expose()
  @ApiProperty({
    description: 'วันที่สร้าง Comment',
    type: Date,
    format: 'date-time',
  })
  createdAt: Date

  @Expose()
  @ApiProperty({
    description: 'วันที่แก้ไข Comment ล่าสุด',
    type: Date,
    format: 'date-time',
  })
  updatedAt: Date

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้สร้าง Comment', type: CommentUserDto })
  createdByUser: CommentUserDto

  @Expose()
  @ApiProperty({
    description: 'ข้อมูลผู้แก้ไข Comment ล่าสุด',
    type: CommentUserDto,
  })
  updatedByUser: CommentUserDto
}
