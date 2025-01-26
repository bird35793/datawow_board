// src/users/dto/request-login-user.dto.ts
import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RequestLoginUserDto {
  @ApiProperty({ description: 'ชื่อผู้ใช้' })
  @IsNotEmpty({ message: 'กรุณากรอก Username' })
  @IsString({ message: 'Username ต้องเป็นข้อความ' })
  username: string

  @ApiProperty({ description: 'รหัสผ่าน' })
  @IsNotEmpty({ message: 'กรุณากรอก Password' })
  @IsString({ message: 'Password ต้องเป็นข้อความ' })
  password: string
}
