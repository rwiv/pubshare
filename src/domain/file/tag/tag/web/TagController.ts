import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagService } from '@/domain/file/tag/tag/domain/TagService';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() creation: TagCreation) {
    return this.tagService.create(creation);
  }

  @Get('name/:fileId')
  findByName(@Param('name') name: string) {
    return this.tagService.findByName(name);
  }
}
