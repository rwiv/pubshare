import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessService } from '@/domain/access/domain/AccessService';
import {
  AccessFileRequest,
  FileUploadRequest,
} from '@/domain/access/web/types';

@Controller('api/access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Get('head')
  async head(@Query('key') key: string) {
    return this.accessService.head(key);
  }

  @Get('list')
  async list(@Query('key') key: string) {
    return this.accessService.list(key);
  }

  @Get('download')
  async download(@Res() res: Response, @Query('key') key: string) {
    const getObj = await this.accessService.download(key);
    res.header('Content-Disposition', 'attachment; filename=download.txt');
    (getObj.Body as any).pipe(res);
  }

  @Put('mkdir')
  async mkdir(@Body() req: AccessFileRequest) {
    await this.accessService.mkdir(req);
    return 'upload complete';
  }

  @Put('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() req: FileUploadRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.accessService.upload(req, file);
    return 'upload complete';
  }

  @Delete('delete')
  async delete(@Body() req: AccessFileRequest) {
    await this.accessService.delete(req);
    return 'delete complete';
  }
}
