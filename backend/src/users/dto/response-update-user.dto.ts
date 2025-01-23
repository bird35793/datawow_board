import { Expose } from 'class-transformer';
import { ResponseUserDto } from './response-user.dto';

export class ResponseUpdateUserDto extends ResponseUserDto {
  @Expose()
  updatedAt?: Date;

  @Expose()
  updatedByDisplayName?: string; // เพิ่ม field นี้
}