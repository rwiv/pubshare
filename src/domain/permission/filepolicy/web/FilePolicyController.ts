import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FilePolicyService } from '@/domain/permission/filepolicy/domain/FilePolicyService';
import { FilePolicyCreation } from '@/domain/permission/filepolicy/persistence/types';

@Controller('api/file-policies')
export class FilePolicyController {
  constructor(private readonly filePolicyService: FilePolicyService) {}

  @Post()
  create(@Body() creation: FilePolicyCreation) {
    return this.filePolicyService.create(creation);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.filePolicyService.findById(id);
  }

  @Get('file-id/:fileId')
  findByFileId(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.filePolicyService.findByFileId(fileId);
  }
}
