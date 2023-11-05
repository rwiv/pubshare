import {Controller, Get, HttpException, Logger, UseGuards} from '@nestjs/common';
import { Types } from '@/auth/authorization/types';
import { AuthGuard } from '@/auth/authorization/AuthGuard';
import { TypeGuard } from '@/auth/authorization/TypeGuard';
import { AuthDecorator } from '@/auth/Auth.decorator';
import { SecurityContext } from '@/auth/authentication/types';
import {WebException} from "@/misc/error/exception/WebException";
import {PermissionException} from "@/domain/permission/common/PermissionException";

@Controller('dev')
export class DevController {
  private readonly logger = new Logger(DevController.name);

  @Get('hello')
  getHello(): string {
    this.logger.log('hello');
    this.logger.debug('logging');
    return 'hello world';
  }

  @Get('profile')
  @Types('ADMIN')
  @UseGuards(AuthGuard, TypeGuard)
  getProfile(@AuthDecorator() auth: SecurityContext) {
    return auth;
  }
}
