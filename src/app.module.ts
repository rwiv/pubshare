import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DevModule } from './dev/dev.module';
import { AccessModule } from './access/access.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, DevModule, AccessModule, AuthModule],
})
export class AppModule {}
