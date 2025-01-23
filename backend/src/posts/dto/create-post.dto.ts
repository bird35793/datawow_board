import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty({ description: 'หัวข้อโพสต์' }) // Swagger Doc
  @IsString({ message: 'Title ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอก Title' })
  @MaxLength(500, { message: 'Title ต้องไม่เกิน 500 ตัวอักษร' })
  title: string

  @ApiProperty({ description: 'เนื้อหาโพสต์' }) // Swagger Doc
  @IsString({ message: 'Content ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอก Content' })
  content: string

  @ApiProperty({ description: 'ไอดีผู้เขียน' }) // Swagger Doc
  @IsNotEmpty({ message: 'กรุณากรอก AuthorId' })
  authorId: number
}
