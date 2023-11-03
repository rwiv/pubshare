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
import { S3Client } from '@/domain/access/client/S3Client';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessService } from '@/domain/access/domain/AccessService';
import { AccessFileRequest } from '@/domain/access/web/forms';

@Controller('api/access')
export class AccessController {
  private client = new S3Client();

  constructor(private readonly accessService: AccessService) {}

  @Get('head')
  async head(@Query('key') key: string) {
    return this.client.head(key);
  }

  @Get('list')
  async list(@Query('key') key: string) {
    return this.client.list(key);
  }

  @Get('download')
  async download(@Res() res: Response, @Query('key') key: string) {
    const getObj = await this.client.download(key);
    res.header('Content-Disposition', 'attachment; filename=download.txt');
    (getObj.Body as any).pipe(res);
  }

  @Put('mkdir')
  async mkdir(@Body() req: AccessFileRequest) {
    await this.client.mkdir(req.key);
    return 'upload complete';
  }

  @Put('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() req: AccessFileRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.client.upload(req.key, file.stream);
    return 'upload complete';
  }

  @Delete('delete')
  async delete(@Body() req: AccessFileRequest) {
    await this.client.delete(req.key);
    return 'delete complete';
  }
}
