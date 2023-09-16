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

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
