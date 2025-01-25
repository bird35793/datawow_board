import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer'

export class CommentUserDto {
  // DTO สำหรับข้อมูลผู้ใช้
  @ApiProperty({ description: 'ชื่อที่แสดงของผู้ใช้', type: String })
  displayName: string
}

export class CommentPostDto {
  // DTO สำหรับข้อมูลโพสต์
  @ApiProperty({ description: 'ชื่อของโพสต์', type: String })
  title: string
}

export class ResponseCommentDto {
  @Expose()
  @ApiProperty({ description: 'ID ของ Comment', type: Number })
  id: number

  @Expose()
  @ApiProperty({ description: 'เนื้อหาของ Comment', type: String })
  content: string

  @Expose()
  @ApiProperty({ description: 'สถานะการใช้งาน', type: Boolean })
  isActive: boolean

  @Expose()
  @ApiProperty({ description: 'ข้อมูล Post', type: CommentPostDto }) // หรือระบุ type ที่ถูกต้องของ Post เช่น PostDto
  post: CommentPostDto

  @Expose()
  @ApiProperty({ description: 'ข้อมูล User', type: CommentUserDto }) // หรือระบุ type ที่ถูกต้องของ User เช่น UserDto
  user: CommentUserDto

  @Exclude()
  postId: number

  @Exclude()
  userId: number

  @Exclude()
  createdBy: number

  @Exclude()
  updatedBy: number

  @Exclude()
  deletedAt: Date

  @Exclude()
  deletedBy: number
}
