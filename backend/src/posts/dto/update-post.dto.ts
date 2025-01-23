import { IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePostDto {
  @ApiProperty({ description: 'หัวข้อโพสต์ (แก้ไขได้)', required: false }) // Swagger Doc
  @IsOptional()
  @IsString({ message: 'Title ต้องเป็นข้อความ' })
  @MaxLength(500, { message: 'Title ต้องไม่เกิน 500 ตัวอักษร' })
  title?: string

  @ApiProperty({ description: 'เนื้อหาโพสต์ (แก้ไขได้)', required: false }) // Swagger Doc
  @IsOptional()
  @IsString({ message: 'Content ต้องเป็นข้อความ' })
  content?: string
}
