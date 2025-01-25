import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponseUserDto, UserDto } from './response-user.dto';

export class ResponseUpdateUserDto extends ResponseUserDto {
  @Expose()
  @ApiProperty({ description: 'วันที่แก้ไขผู้ใช้ล่าสุด', type: Date, format: 'date-time', nullable: true })
  updatedAt?: Date;

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้แก้ไขผู้ใช้ล่าสุด', type: UserDto })
  updatedByUser: UserDto;
}