import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { Roles } from '@/auth/authorization/roles';
import { AuthGuard } from '@/auth/authorization/auth.guard';
import { RolesGuard } from '@/auth/authorization/role.guard';
import { Auth } from '@/auth/auth.decorator';
import { SecurityContext } from '@/auth/authentication/types';

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
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  getProfile(@Auth() auth: SecurityContext) {
    return auth;
  }
}
