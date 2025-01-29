import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
// src/users/dto/create-user.dto.ts

export class RequestCreateUserDto {
  @ApiProperty({ description: 'ชื่อผู้ใช้' }) // Swagger Doc
  @IsNotEmpty({ message: 'กรุณากรอก Username' })
  @IsString({ message: 'Username ต้องเป็นข้อความ' })
  @MaxLength(100, { message: 'Username ต้องไม่เกิน 100 ตัวอักษร' })
  username: string

  @ApiProperty({ description: 'ชื่อที่แสดง' }) // Swagger Doc
  @IsNotEmpty({ message: 'กรุณากรอก DisplayName' })
  @IsString({ message: 'DisplayName ต้องเป็นข้อความ' })
  @MaxLength(100, { message: 'DisplayName ต้องไม่เกิน 100 ตัวอักษร' })
  displayName: string

  @ApiProperty({ description: 'อีเมล' }) // Swagger Doc
  @IsNotEmpty({ message: 'กรุณากรอก Email' })
  @IsString({ message: 'Email ต้องเป็นข้อความ' })
  @IsEmail({}, { message: 'Email ไม่ถูกต้อง' })
  @MaxLength(100, { message: 'Email ต้องไม่เกิน 100 ตัวอักษร' })
  email: string

  @ApiProperty({ description: 'รหัสผ่าน' })
  @IsNotEmpty({ message: 'กรุณากรอก Password' })
  @IsString({ message: 'Password ต้องเป็นข้อความ' })
  @MinLength(8, { message: 'Password ต้องมีความยาวอย่างน้อย 8 ตัวอักษร' })
  @MaxLength(100, { message: 'Password ต้องไม่เกิน 100 ตัวอักษร' })
  password: string
}
