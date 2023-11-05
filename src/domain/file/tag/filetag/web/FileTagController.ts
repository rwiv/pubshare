import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FileTagService } from '@/domain/file/tag/filetag/domain/FileTagService';

@Controller('api/file-tags')
export class FileTagController {
  constructor(private readonly fileTagService: FileTagService) {}

  @Post()
  create(@Body() creation: FileTagCreationRequest) {
    return this.fileTagService.create(creation);
  }

  @Get('file-id/:fileId')
  findByFileId(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.fileTagService.findByFileId(fileId);
  }

  @Get('tag-id/:tagId')
  findByTagId(@Param('tagId', ParseIntPipe) tagId: number) {
    return this.fileTagService.findByTagId(tagId);
  }
}
