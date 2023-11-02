import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/domain/user/domain/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest, SecurityContext } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(req: LoginRequest) {
    const user = await this.userService.findByUsername(req.email);
    if (user?.password !== req.password) {
      throw new UnauthorizedException();
    }

    const { id, email, role, certified } = user;
    const payload: SecurityContext = { id, email, role, certified };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
