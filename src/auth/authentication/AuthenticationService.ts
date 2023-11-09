import { Injectable } from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest, AuthToken } from './types';
import { AuthenticationException } from '@/auth/authentication/AuthenticationException';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async login(req: LoginRequest) {
    const account = await this.accountService.findByUsername(req.username);
    if (account?.password !== req.password) {
      throw new AuthenticationException('login failure');
    }

    const { username, type } = account;
    const payload: AuthToken = { username, type };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
