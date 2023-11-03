import { Module } from '@nestjs/common';
import { AccountModule } from '@/domain/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from '@/auth/authentication/authentication.service';
import { AuthGuard } from '@/auth/authorization/auth.guard';
import { TypeGuard } from '@/auth/authorization/type.guard';
import { jwtConstants } from '@/auth/authentication/jwt.constants';

@Module({
  providers: [AuthenticationService, AuthGuard, TypeGuard],
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
