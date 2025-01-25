import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponseCommentDto, CommentUserDto } from './response-comment.dto'; // Import Base DTO

export class ResponseCreateCommentDto extends ResponseCommentDto {
  @Expose()
  @ApiProperty({ description: 'วันที่สร้าง Comment', type: Date, format: 'date-time' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'ข้อมูลผู้สร้าง Comment', type: CommentUserDto })
  createdByUser: CommentUserDto;
}