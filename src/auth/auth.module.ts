import { Module } from '@nestjs/common';
import { UserModule } from '@/domain/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/authentication/auth.service';
import { AuthGuard } from '@/auth/authorization/auth.guard';
import { RolesGuard } from '@/auth/authorization/role.guard';
import { jwtConstants } from '@/auth/authentication/jwt.constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
