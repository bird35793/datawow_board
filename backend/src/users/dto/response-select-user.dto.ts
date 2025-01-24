import { Exclude, Expose } from 'class-transformer'
import { ResponseUserDto } from './response-user.dto'

export class ResponseSelectUserDto extends ResponseUserDto {
  @Expose()
  createdAt?: Date

  @Expose()
  createdByDisplayName?: string // เพิ่ม field นี้

  @Expose()
  updatedAt?: Date

  @Expose()
  updatedByDisplayName?: string // เพิ่ม field นี้

  @Exclude() // Exclude deletedAt and deletedBy
  deletedAt?: Date

  @Exclude()
  deletedBy?: number
}
