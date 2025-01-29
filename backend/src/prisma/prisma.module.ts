import { Module, Global } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global() // ทำให้ PrismaService ใช้ได้ทุกที่
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
