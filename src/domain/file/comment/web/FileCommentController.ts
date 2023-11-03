import { Body, Controller, Get, Post } from '@nestjs/common';
import { FileCommentService } from '@/domain/file/comment/domain/FileCommentService';
import { FileCommentCreation } from '@/domain/file/comment/persistence/types';

@Controller('api/file/comments')
export class FileCommentController {
  constructor(private readonly fileCommentService: FileCommentService) {}

  @Get()
  findAll() {}

  @Post()
  async create(@Body() creation: FileCommentCreation) {}
}
