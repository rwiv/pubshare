import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FileCommentService } from '@/domain/file/comment/domain/FileCommentService';
import { FileCommentCreation } from '@/domain/file/comment/persistence/types';

@Controller('api/file/comments')
export class FileCommentController {
  constructor(private readonly fileCommentService: FileCommentService) {}

  @Post()
  create(@Body() creation: FileCommentCreation) {
    return this.fileCommentService.create(creation);
  }

  @Get(':fileId')
  findByFileId(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.fileCommentService.findByFileId(fileId);
  }
}
