import { Module } from '@nestjs/common';
import { AccountModule } from '@/domain/account/AccountModule';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from '@/auth/authentication/AuthenticationService';
import { AuthGuard } from '@/auth/authorization/AuthGuard';
import { TypeGuard } from '@/auth/authorization/TypeGuard';
import { jwtConstants } from '@/auth/authentication/jwtConstants';

@Module({
  providers: [AuthenticationService, AuthGuard, TypeGuard],
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // TODO refresh token 적용 -> expire time 감소
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
