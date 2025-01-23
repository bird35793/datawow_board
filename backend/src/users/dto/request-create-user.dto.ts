// src/users/dto/create-user.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RequestCreateUserDto {
  @ApiProperty({ description: 'ชื่อผู้ใช้' }) // Swagger Doc
  @IsString({ message: 'Username ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอก Username' })
  @MaxLength(100, { message: 'Username ต้องไม่เกิน 100 ตัวอักษร' })
  username: string

  @ApiProperty({ description: 'ชื่อที่แสดง' }) // Swagger Doc
  @IsString({ message: 'DisplayName ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอก DisplayName' })
  @MaxLength(100, { message: 'DisplayName ต้องไม่เกิน 100 ตัวอักษร' })
  displayName: string

  @ApiProperty({ description: 'อีเมล' }) // Swagger Doc
  @IsString({ message: 'Email ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอก Email' })
  @MaxLength(100, { message: 'Email ต้องไม่เกิน 100 ตัวอักษร' })
  email: string
}
