// src/users/dto/update-user.dto.ts
import { IsString, MaxLength, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RequestUpdateUserDto {
  @ApiProperty({ description: 'ชื่อผู้ใช้ (แก้ไขได้)', required: false }) // Swagger Doc
  @IsOptional()
  @IsString({ message: 'Username ต้องเป็นข้อความ' })
  @MaxLength(100, { message: 'Username ต้องไม่เกิน 100 ตัวอักษร' })
  username?: string

  @ApiProperty({ description: 'ชื่อที่แสดง (แก้ไขได้)', required: false }) // Swagger Doc
  @IsOptional()
  @IsString({ message: 'DisplayName ต้องเป็นข้อความ' })
  @MaxLength(100, { message: 'DisplayName ต้องไม่เกิน 100 ตัวอักษร' })
  displayName?: string

  @ApiProperty({ description: 'อีเมล (แก้ไขได้)', required: false }) // Swagger Doc
  @IsOptional()
  @IsString({ message: 'Email ต้องเป็นข้อความ' })
  @MaxLength(100, { message: 'Email ต้องไม่เกิน 100 ตัวอักษร' })
  email?: string
}
