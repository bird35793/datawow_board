// src/comments/dto/request-update-comment.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestUpdateCommentDto {
  @ApiProperty({ description: 'เนื้อหา Comment (แก้ไขได้)', required: false })
  @IsOptional()
  @IsString({ message: 'Content ต้องเป็นข้อความ' })
  content?: string;
}