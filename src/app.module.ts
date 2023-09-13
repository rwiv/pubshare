import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DevModule } from './dev/dev.module';
import { AccessModule } from './access/access.module';

@Module({
  imports: [UserModule, DevModule, AccessModule],
})
export class AppModule {}
