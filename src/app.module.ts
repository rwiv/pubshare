import { Module } from '@nestjs/common';
import { DevModule } from '@/domain/dev/dev.module';
import { AccessModule } from '@/domain/access/access.module';
import { AuthModule } from '@/auth/auth.module';
import { AccountModule } from '@/domain/account/account.module';

@Module({
  imports: [AccountModule, DevModule, AccessModule, AuthModule],
})
export class AppModule {}
