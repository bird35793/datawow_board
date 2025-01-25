import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponsePostDto, PostUserDto } from './response-post.dto';

export class ResponseUpdatePostDto extends ResponsePostDto {
  @Expose()
  @ApiProperty({ description: 'วันที่แก้ไขโพสต์ล่าสุด', type: Date, format: 'date-time' })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้แก้ไขโพสต์ล่าสุด', type: PostUserDto })
  updatedByUser: PostUserDto;
}