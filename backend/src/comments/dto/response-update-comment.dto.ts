import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponseCommentDto, CommentUserDto } from './response-comment.dto';

export class ResponseUpdateCommentDto extends ResponseCommentDto {
  @Expose()
  @ApiProperty({ description: 'วันที่แก้ไข Comment ล่าสุด', type: Date, format: 'date-time' })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้แก้ไข Comment ล่าสุด', type: CommentUserDto })
  updatedByUser: CommentUserDto;
}