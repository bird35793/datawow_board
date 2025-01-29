import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

// DTO สำหรับข้อมูลผู้ใช้ (PostUserDto)
export class PostUserDto {
  @ApiProperty({ description: 'ชื่อที่แสดงของผู้ใช้', type: String })
  displayName: string
}

// DTO สำหรับข้อมูล Post (ResponsePostDto)
export class ResponsePostDto {
  @Expose()
  @ApiProperty({ description: 'ID ของโพสต์', type: Number })
  id: number

  @Expose()
  @ApiProperty({ description: 'หัวข้อของโพสต์', type: String })
  title: string

  @Expose()
  @ApiProperty({ description: 'เนื้อหาของโพสต์', type: String })
  content: string

  @Expose()
  @ApiProperty({ description: 'สถานะการใช้งานของโพสต์', type: Boolean })
  isActive: boolean

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้เขียนโพสต์', type: PostUserDto })
  author: PostUserDto

  @Exclude()
  createdBy: number

  @Exclude()
  updatedBy: number

  @Exclude()
  authorId: number

  @Exclude()
  deletedAt: Date

  @Exclude()
  deletedBy: number
}
