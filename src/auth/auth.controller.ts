import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './authentication/auth.service';
import { AuthGuard } from './authorization/auth.guard';
import { LoginRequest } from './authentication/types';
import { Roles } from './authorization/roles';
import { RolesGuard } from './authorization/role.guard';

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
  getProfile(@Request() req) {
    return req.user;
  }
}
