import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/auth/authentication/auth.service';
import { AuthGuard } from '@/auth/authorization/auth.guard';
import { LoginRequest, SecurityContext } from '@/auth/authentication/types';
import { RolesGuard } from '@/auth/authorization/role.guard';
import { Auth } from '@/auth/auth.decorator';
import { Roles } from '@/auth/authorization/roles';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @Get('profile')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  getProfile(@Auth() auth: SecurityContext) {
    return auth;
  }
}
