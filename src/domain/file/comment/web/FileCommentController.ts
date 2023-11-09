import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FileCommentService } from '@/domain/file/comment/domain/FileCommentService';
import { FileComment } from '@/domain/file/comment/persistence/types';
import { FileCommentCreation } from '@/domain/file/comment/domain/types';

@Controller('api/file-comments')
export class FileCommentController {
  constructor(private readonly fileCommentService: FileCommentService) {}

  @Post()
  create(@Body() creation: FileCommentCreation): Promise<FileComment> {
    return this.fileCommentService.create(creation);
  }

  @Get('file-id/:fileId')
  findByFileId(
    @Param('fileId', ParseIntPipe) fileId: number,
  ): Promise<FileComment[]> {
    return this.fileCommentService.findByFileId(fileId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.fileCommentService.delete(id);
  }
}
