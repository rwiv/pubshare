import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './authentication/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './authentication/jwt.constants';
import { AuthGuard } from './authorization/auth.guard';
import { RolesGuard } from './authorization/role.guard';

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
