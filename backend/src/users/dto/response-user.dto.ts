import { Exclude, Expose } from 'class-transformer'
import { User } from '@prisma/client'

export class ResponseUserDto {
  @Expose()
  id: number

  @Expose()
  username: string

  @Expose()
  email: string

  @Expose()
  isActive: Boolean

  @Exclude()
  createdByUser: User

  @Exclude()
  updatedByUser: User

  @Exclude()
  createdBy: number

  @Exclude()
  updatedBy: number
}
