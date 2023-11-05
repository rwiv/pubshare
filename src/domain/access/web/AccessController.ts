import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessService } from '@/domain/access/domain/AccessService';
import {
  AccessFileRequest,
  FileUploadRequest,
} from '@/domain/access/web/types';
import { AuthGuard } from '@/auth/authorization/AuthGuard';
import { Auth } from '@/auth/Auth';
import { SecurityContext } from '@/auth/authentication/types';

@Controller('api/access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Get('head')
  @UseGuards(AuthGuard)
  async head(@Auth() auth: SecurityContext, @Query('key') key: string) {
    return this.accessService.head(auth, key);
  }

  @Get('list')
  @UseGuards(AuthGuard)
  async list(@Auth() auth: SecurityContext, @Query('key') key: string) {
    return this.accessService.list(auth, key);
  }

  @Get('download')
  @UseGuards(AuthGuard)
  async download(
    @Auth() auth: SecurityContext,
    @Res() res: Response,
    @Query('key') key: string,
  ) {
    const getObj = await this.accessService.download(auth, key);
    res.header('Content-Disposition', 'attachment; filename=download.txt');
    (getObj.Body as any).pipe(res);
  }

  @Put('mkdir')
  @UseGuards(AuthGuard)
  async mkdir(@Auth() auth: SecurityContext, @Body() req: AccessFileRequest) {
    await this.accessService.mkdir(auth, req);
    return 'upload complete';
  }

  @Put('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Auth() auth: SecurityContext,
    @Body() req: FileUploadRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.accessService.upload(auth, req, file);
    return 'upload complete';
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async delete(@Auth() auth: SecurityContext, @Body() req: AccessFileRequest) {
    await this.accessService.delete(auth, req);
    return 'delete complete';
  }
}
