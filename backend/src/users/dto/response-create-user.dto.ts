import { Expose } from 'class-transformer';
import { ResponseUserDto } from './response-user.dto';

export class ResponseCreateUserDto extends ResponseUserDto {
  @Expose()
  createdAt?: Date;

  @Expose()
  createdByDisplayName?: string; // เพิ่ม field นี้
}