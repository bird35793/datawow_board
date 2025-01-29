import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { ResponseUserDto, UserDto } from './response-user.dto'

export class ResponseSelectUserDto extends ResponseUserDto {
  @Expose()
  @ApiProperty({
    description: 'วันที่สร้างผู้ใช้',
    type: Date,
    format: 'date-time',
    nullable: true,
  })
  createdAt?: Date

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้สร้างผู้ใช้', type: UserDto })
  createdByUser: UserDto

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้แก้ไขผู้ใช้ล่าสุด', type: UserDto })
  updatedByUser: UserDto

  @Expose()
  @ApiProperty({
    description: 'วันที่แก้ไขผู้ใช้ล่าสุด',
    type: Date,
    format: 'date-time',
    nullable: true,
  })
  updatedAt?: Date

  @Exclude() // Exclude deletedAt and deletedBy
  deletedAt?: Date

  @Exclude()
  deletedBy?: number
}
