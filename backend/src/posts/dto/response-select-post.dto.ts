import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { ResponsePostDto, PostUserDto } from './response-post.dto'

import { ResponseSelectCommentDto } from '../../comments/dto/response-select-comment.dto'

export class ResponseSelectPostDto extends ResponsePostDto {
  @Expose()
  @ApiProperty({
    description: 'วันที่สร้างโพสต์',
    type: Date,
    format: 'date-time',
  })
  createdAt: Date

  @Expose()
  @ApiProperty({
    description: 'วันที่แก้ไขโพสต์ล่าสุด',
    type: Date,
    format: 'date-time',
    nullable: true,
  })
  updatedAt?: Date

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้สร้างโพสต์', type: PostUserDto })
  createdByUser: PostUserDto

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้แก้ไขโพสต์ล่าสุด', type: PostUserDto })
  updatedByUser: PostUserDto

  @Exclude()
  comments: ResponseSelectCommentDto

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้แก้ไขโพสต์ล่าสุด', type: Number })
  commentCount: number
}
