import {
  Body,
  Controller,
  Get,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccessService } from '../domain/access.service';
import { Response } from 'express';
import { S3Client } from '../client/s3.client';
import { UploadReq } from './forms';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/access')
export class AccessController {
  private client = new S3Client();

  constructor(private readonly accessService: AccessService) {}

  @Put('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() body: UploadReq,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(body);
    console.log(file);
  }

  @Get('download')
  async download(@Res() res: Response) {
    res.header('Content-Disposition', 'attachment; filename=download.txt');
    const ret = await this.client.download('test123.txt');
    (ret.Body as any).pipe(res);
  }
}
