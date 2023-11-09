import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FileRoleService } from '@/domain/permission/filerole/domain/FileRoleService';
import { FileRoleCreation } from '@/domain/permission/filerole/domain/types';

@Controller('api/file-roles')
export class FileRoleController {
  constructor(private readonly fileRoleService: FileRoleService) {}

  @Post()
  create(@Body() creation: FileRoleCreation) {
    return this.fileRoleService.create(creation);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.fileRoleService.findById(id);
  }

  @Get('file-id/:fileId')
  findByFileId(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.fileRoleService.findByFileId(fileId);
  }
}
