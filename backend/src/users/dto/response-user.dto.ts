import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

export class UserDto {
  // DTO สำหรับข้อมูลผู้ใช้
  @ApiProperty({ description: 'ชื่อที่แสดงของผู้ใช้', type: String })
  displayName: string
}

export class ResponseUserDto {
  @Expose()
  @ApiProperty({ description: 'ID ของผู้ใช้', type: Number })
  id: number

  @Expose()
  @ApiProperty({ description: 'ชื่อผู้ใช้', type: String })
  username: string

  @Expose()
  @ApiProperty({ description: 'อีเมลของผู้ใช้', type: String })
  email: string

  @Expose()
  @ApiProperty({
    description: 'สถานะการใช้งานของผู้ใช้ (เปิด/ปิด)',
    type: Boolean,
  })
  isActive: boolean

  @Exclude()
  createdBy: number

  @Exclude()
  updatedBy: number
}
