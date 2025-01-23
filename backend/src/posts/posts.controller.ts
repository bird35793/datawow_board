// src/posts/posts.controller.ts
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
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ResponseCreatePostDto } from './dto/response-create-post.dto'
import { ResponseSelectPostDto } from './dto/response-select-post.dto'
import { ResponseUpdatePostDto } from './dto/response-update-post.dto'

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'สร้างโพสต์สำเร็จ',
    type: ResponseCreatePostDto,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @Get()
  @ApiOkResponse({
    description: 'ดึงข้อมูลโพสต์ทั้งหมด',
    type: [ResponseSelectPostDto],
  })
  findAll() {
    return this.postsService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'ดึงข้อมูลโพสต์ด้วย ID',
    type: ResponseSelectPostDto,
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'แก้ไขข้อมูลโพสต์',
    type: ResponseUpdatePostDto,
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'ลบข้อมูลโพสต์' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
}
