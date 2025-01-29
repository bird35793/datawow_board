import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { ResponsePostDto, PostUserDto } from './response-post.dto'

export class ResponseCreatePostDto extends ResponsePostDto {
  @Expose()
  @ApiProperty({
    description: 'วันที่สร้างโพสต์',
    type: Date,
    format: 'date-time',
  })
  createdAt: Date

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้สร้างโพสต์', type: PostUserDto })
  createdByUser: PostUserDto
}
