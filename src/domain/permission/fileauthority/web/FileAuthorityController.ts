import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';
import { FileAuthorityCreation } from '@/domain/permission/fileauthority/domain/types';

@Controller('api/file-authorities')
export class FileAuthorityController {
  constructor(private readonly fileAuthorityService: FileAuthorityService) {}

  @Post()
  create(@Body() creation: FileAuthorityCreation) {
    return this.fileAuthorityService.create(creation);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.fileAuthorityService.findById(id);
  }

  @Get('file-id/:fileId')
  findByFileId(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.fileAuthorityService.findByFileId(fileId);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.fileAuthorityService.delete(id);
  }
}
