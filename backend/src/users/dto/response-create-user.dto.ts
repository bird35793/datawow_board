import { Expose } from 'class-transformer'
import { ResponseUserDto, UserDto } from './response-user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class ResponseCreateUserDto extends ResponseUserDto {
  @Expose()
  @ApiProperty({
    description: 'วันที่สร้างผู้ใช้',
    type: Date,
    format: 'date-time',
    nullable: true,
  }) // เพิ่ม nullable สำหรับ optional
  createdAt?: Date

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้สร้างผู้ใช้', type: UserDto }) // ใช้ UserDto แทน User
  createdByUser: UserDto
}
