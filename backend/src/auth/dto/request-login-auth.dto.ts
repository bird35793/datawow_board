import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RequestLoginAuthDto {
  @ApiProperty({ description: 'ชื่อผู้ใช้สำหรับเข้าสู่ระบบ' })
  @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ใช้' })
  @IsString({ message: 'ชื่อผู้ใช้ต้องเป็นข้อความ' })
  username: string

  @ApiProperty({ description: 'รหัสผ่านสำหรับเข้าสู่ระบบ' })
  @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
  @IsString({ message: 'รหัสผ่านต้องเป็นข้อความ' })
  password: string
}
