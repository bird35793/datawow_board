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
  HttpStatus,
  UseGuards, // Import HttpStatus
  Request,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { RequestCreatePostDto } from './dto/request-create-post.dto'
import { RequestUpdatePostDto } from './dto/request-update-post.dto'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { ResponseCreatePostDto } from './dto/response-create-post.dto'
import { ResponseSelectPostDto } from './dto/response-select-post.dto'
import { ResponseUpdatePostDto } from './dto/response-update-post.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth() // เพิ่มตรงนี้
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // สร้างเส้นทางสำหรับการสร้างโพสต์ใหม่
  @UseGuards(JwtAuthGuard) // ป้องกันทั้ง controller
  @Post()
  @HttpCode(HttpStatus.CREATED) // ใช้ HttpStatus enum เพื่อความชัดเจน
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'สร้างโพสต์ใหม่',
    description: 'สร้างโพสต์ใหม่ด้วยข้อมูลที่กำหนด',
  })
  @ApiCreatedResponse({
    description: 'สร้างโพสต์สำเร็จ',
    type: ResponseCreatePostDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ข้อมูลที่ส่งมาไม่ถูกต้อง',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  }) // ตัวอย่างการเพิ่ม 401
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  create(@Body() createPostDto: RequestCreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user?.id)
  }


  // สร้างเส้นทางสำหรับการดึงข้อมูลโพสต์ทั้งหมด
  @Get()
  @ApiOperation({
    summary: 'ดึงข้อมูลโพสต์ทั้งหมด',
    description: 'ดึงข้อมูลโพสต์ทั้งหมดที่มีอยู่ในระบบ',
  })
  @ApiOkResponse({
    description: 'ดึงข้อมูลโพสต์สำเร็จ',
    type: [ResponseSelectPostDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  }) // ตัวอย่างการเพิ่ม 401
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  findAll() {
    return this.postsService.findAll()
  }


  // สร้างเส้นทางสำหรับการดึงข้อมูลโพสต์ด้วย ID
  @Get(':id')
  @ApiOperation({
    summary: 'ดึงข้อมูลโพสต์ด้วย ID',
    description: 'ดึงข้อมูลโพสต์โดยระบุ ID ของโพสต์',
  })
  @ApiOkResponse({
    description: 'ดึงข้อมูลโพสต์สำเร็จ',
    type: ResponseSelectPostDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบโพสต์' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  }) // ตัวอย่างการเพิ่ม 401
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }


  // สร้างเส้นทางสำหรับการแก้ไขข้อมูลโพสต์
  @UseGuards(JwtAuthGuard) // ป้องกันทั้ง controller
  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'แก้ไขข้อมูลโพสต์',
    description: 'แก้ไขข้อมูลโพสต์โดยระบุ ID และข้อมูลที่ต้องการแก้ไข',
  })
  @ApiOkResponse({
    description: 'แก้ไขข้อมูลโพสต์สำเร็จ',
    type: ResponseUpdatePostDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ข้อมูลที่ส่งมาไม่ถูกต้อง',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบโพสต์' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  }) // ตัวอย่างการเพิ่ม 401
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  update(@Param('id') id: string, @Body() updatePostDto: RequestUpdatePostDto, @Request() req) {
    return this.postsService.update(+id, updatePostDto, req.user?.id)
  }


  // สร้างเส้นทางสำหรับการลบข้อมูลโพสต์
  @UseGuards(JwtAuthGuard) // ป้องกันทั้ง controller
  @Delete(':id')
  @ApiOperation({
    summary: 'ลบโพสต์',
    description: 'ลบโพสต์โดยระบุ ID ของโพสต์',
  })
  @ApiOkResponse({ description: 'ลบข้อมูลโพสต์สำเร็จ' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบโพสต์' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'ไม่ได้รับอนุญาต',
  }) // ตัวอย่างการเพิ่ม 401
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'เกิดข้อผิดพลาดที่ฝั่ง Server',
  })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
}
