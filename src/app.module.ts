import { Module } from '@nestjs/common';
import { DevModule } from '@/domain/dev/dev.module';
import { AccessModule } from '@/domain/access/access.module';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/domain/user/user.module';

@Module({
  imports: [UserModule, DevModule, AccessModule, AuthModule],
})
export class AppModule {}
