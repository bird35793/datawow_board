import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
    // DTO สำหรับข้อมูลผู้ใช้
    @ApiProperty({ description: 'ชื่อที่แสดงของผู้ใช้', type: String })
    displayName: string
  }

export class ResponseLoginAuthDto {
  @ApiProperty({ description: 'Access Token (JWT)' })
  access_token: string;

  @ApiProperty({ description: 'ข้อมูลผู้ใช้' })
  user: AuthUserDto
}