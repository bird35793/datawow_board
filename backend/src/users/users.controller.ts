import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode, // Import HttpCode
} from '@nestjs/common'
import { UsersService } from './users.service'
import { RequestCreateUserDto } from './dto/request-create-user.dto'
import { RequestUpdateUserDto } from './dto/request-update-user.dto'
import {
  ApiResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger'
import { ResponseCreateUserDto } from './dto/response-create-user.dto'
import { ResponseSelectUserDto } from './dto/response-select-user.dto'
import { ResponseUpdateUserDto } from './dto/response-update-user.dto'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201) // กำหนด HTTP status code ให้ถูกต้อง (201 Created)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'สร้างผู้ใช้ใหม่',
    description: 'สร้างผู้ใช้ใหม่ด้วยข้อมูลที่กำหนด',
  })
  @ApiResponse({
    status: 201,
    description: 'สร้างผู้ใช้สำเร็จ',
    type: ResponseCreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'ข้อมูลที่ส่งมาไม่ถูกต้อง (Bad Request)',
  })
  @ApiResponse({
    status: 500,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server (Internal Server Error)',
  }) // เพิ่ม 500
  create(@Body() requestCreateUserDto: RequestCreateUserDto) {
    return this.usersService.create(requestCreateUserDto)
  }

  @Get()
  @ApiOperation({
    summary: 'ดึงข้อมูลผู้ใช้ทั้งหมด',
    description: 'ดึงข้อมูลผู้ใช้ทั้งหมดที่มีอยู่ในระบบ',
  })
  @ApiOkResponse({
    description: 'ดึงข้อมูลผู้ใช้สำเร็จ',
    type: [ResponseSelectUserDto],
  })
  @ApiResponse({
    status: 500,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server (Internal Server Error)',
  }) // เพิ่ม 500
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'ดึงข้อมูลผู้ใช้ด้วย ID',
    description: 'ดึงข้อมูลผู้ใช้โดยระบุ ID',
  })
  @ApiOkResponse({
    description: 'ดึงข้อมูลผู้ใช้สำเร็จ',
    type: ResponseSelectUserDto,
  })
  @ApiResponse({ status: 404, description: 'ไม่พบผู้ใช้' }) // เพิ่ม 404
  @ApiResponse({
    status: 500,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server (Internal Server Error)',
  }) // เพิ่ม 500
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'แก้ไขข้อมูลผู้ใช้',
    description: 'แก้ไขข้อมูลผู้ใช้โดยระบุ ID และข้อมูลที่ต้องการแก้ไข',
  })
  @ApiOkResponse({
    description: 'แก้ไขข้อมูลผู้ใช้สำเร็จ',
    type: ResponseUpdateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'ข้อมูลที่ส่งมาไม่ถูกต้อง (Bad Request)',
  })
  @ApiResponse({ status: 404, description: 'ไม่พบผู้ใช้' }) // เพิ่ม 404
  @ApiResponse({
    status: 500,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server (Internal Server Error)',
  }) // เพิ่ม 500
  update(
    @Param('id') id: string,
    @Body() requestUpdateUserDto: RequestUpdateUserDto
  ) {
    return this.usersService.update(+id, requestUpdateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบผู้ใช้', description: 'ลบผู้ใช้โดยระบุ ID' })
  @ApiOkResponse({ description: 'ลบข้อมูลผู้ใช้สำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบผู้ใช้' }) // เพิ่ม 404
  @ApiResponse({
    status: 500,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server (Internal Server Error)',
  }) // เพิ่ม 500
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
