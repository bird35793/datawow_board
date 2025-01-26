import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger' // เพิ่ม import ที่ขาดไป
import { RequestCreateAuthDto } from './dto/request-create-auth.dto'
import { RequestLoginAuthDto } from './dto/request-login-auth.dto'
import { ResponseLoginAuthDto } from './dto/response-login-auth.dto' // DTO สำหรับ response login
import { ResponseCreateUserDto } from '../users/dto/response-create-user.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // ใช้ HttpStatus enum
  @ApiOperation({ summary: 'ลงทะเบียนผู้ใช้ใหม่' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'ลงทะเบียนสำเร็จ',
    type: ResponseCreateUserDto,
  }) // เพิ่ม type
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'ชื่อผู้ใช้ซ้ำ' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ข้อมูลไม่ถูกต้อง',
  })
  async register(@Body() createUserDto: RequestCreateAuthDto) {
    return this.authService.register(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'เข้าสู่ระบบ' })
  @ApiBody({ type: RequestLoginAuthDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'เข้าสู่ระบบสำเร็จ',
    type: ResponseLoginAuthDto,
  }) // เพิ่ม type
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
  })
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
