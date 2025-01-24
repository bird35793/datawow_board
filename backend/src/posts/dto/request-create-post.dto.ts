import { IsNotEmpty, IsString, MaxLength, IsDefined } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RequestCreatePostDto {
  @ApiProperty({ description: 'หัวข้อโพสต์' })
  @IsNotEmpty({ message: 'กรุณากรอก Title' })
  @IsString({ message: 'Title ต้องเป็นข้อความ' })
  @IsDefined({ message: 'Title ต้องมีค่า' }) // เพิ่ม IsDefined
  @MaxLength(500, { message: 'Title ต้องไม่เกิน 500 ตัวอักษร' })
  title: string

  @ApiProperty({ description: 'เนื้อหาโพสต์' })
  @IsNotEmpty({ message: 'กรุณากรอก Content' })
  @IsString({ message: 'Content ต้องเป็นข้อความ' })
  content: string

  @ApiProperty({ description: 'ไอดีผู้เขียน' })
  @IsNotEmpty({ message: 'กรุณากรอก AuthorId' })
  authorId: number
}
