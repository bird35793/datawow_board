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
} from '@nestjs/common'
import { UsersService } from './users.service'
import { RequestCreateUserDto } from './dto/request-create-user.dto'
import { RequestUpdateUserDto } from './dto/request-update-user.dto'
import { ApiResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ResponseCreateUserDto } from './dto/response-create-user.dto'
import { ResponseSelectUserDto } from './dto/response-select-user.dto'
import { ResponseUpdateUserDto } from './dto/response-update-user.dto'

@Controller('users')
@ApiTags('users') // เพิ่ม Tag สำหรับ Swagger
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'สร้างผู้ใช้สำเร็จ',
    type: ResponseCreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'ข้อมูลไม่ถูกต้อง' })
  create(@Body() RequestCreateUserDto: RequestCreateUserDto) {
    return this.usersService.create(RequestCreateUserDto)
  }

  @Get()
  @ApiOkResponse({
    description: 'ดึงข้อมูลผู้ใช้ทั้งหมด',
    type: [ResponseSelectUserDto],
  }) // Swagger Response
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'ดึงข้อมูลผู้ใช้ด้วย ID',
    type: ResponseSelectUserDto,
  }) // Swagger Response
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'แก้ไขข้อมูลผู้ใช้',
    type: ResponseUpdateUserDto,
  }) // Swagger Response
  update(
    @Param('id') id: string,
    @Body() RequestUpdateUserDto: RequestUpdateUserDto
  ) {
    return this.usersService.update(+id, RequestUpdateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'ลบข้อมูลผู้ใช้' }) // Swagger Response
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
