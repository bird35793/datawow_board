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
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { RequestCreateCommentDto } from './dto/request-create-comment.dto'
import { RequestUpdateCommentDto } from './dto/request-update-comment.dto'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { ResponseCreateCommentDto } from './dto/response-create-comment.dto'
import { ResponseSelectCommentDto } from './dto/response-select-comment.dto'
import { ResponseUpdateCommentDto } from './dto/response-update-comment.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('comments')
@ApiTags('comments')
@UseGuards(JwtAuthGuard) // ป้องกันทั้ง controller
@ApiBearerAuth() // เพิ่มตรงนี้
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'สร้าง Comment ใหม่',
    description: 'สร้าง Comment ใหม่ด้วยข้อมูลที่กำหนด',
  })
  @ApiCreatedResponse({
    description: 'สร้าง Comment สำเร็จ',
    type: ResponseCreateCommentDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ข้อมูลที่ส่งมาไม่ถูกต้อง',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  create(@Body() createCommentDto: RequestCreateCommentDto, @Request() req) {
    return this.commentsService.create(createCommentDto, req.user?.id)
  }

  @Get()
  @ApiOperation({
    summary: 'ดึงข้อมูล Comment ทั้งหมด',
    description: 'ดึงข้อมูล Comment ทั้งหมดที่มีอยู่ในระบบ',
  })
  @ApiOkResponse({
    description: 'ดึงข้อมูล Comment สำเร็จ',
    type: [ResponseSelectCommentDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  findAll() {
    return this.commentsService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'ดึงข้อมูล Comment ด้วย ID',
    description: 'ดึงข้อมูล Comment โดยระบุ ID ของ Comment',
  })
  @ApiOkResponse({
    description: 'ดึงข้อมูล Comment สำเร็จ',
    type: ResponseSelectCommentDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบ Comment' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'แก้ไขข้อมูล Comment',
    description: 'แก้ไขข้อมูล Comment โดยระบุ ID และข้อมูลที่ต้องการแก้ไข',
  })
  @ApiOkResponse({
    description: 'แก้ไขข้อมูล Comment สำเร็จ',
    type: ResponseUpdateCommentDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ข้อมูลที่ส่งมาไม่ถูกต้อง',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบ Comment' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: RequestUpdateCommentDto, 
    @Request() req
  ) {
    return this.commentsService.update(+id, updateCommentDto, req.user?.id)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'ลบ Comment',
    description: 'ลบ Comment โดยระบุ ID ของ Comment',
  })
  @ApiOkResponse({ description: 'ลบข้อมูล Comment สำเร็จ' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบ Comment' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id)
  }
}
