import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DevModule } from './dev/dev.module';

@Module({
  imports: [UserModule, DevModule],
})
export class AppModule {}
