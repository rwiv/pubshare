import { Module } from '@nestjs/common';
import { DevController } from '@/domain/dev/dev.controller';
import { DevInitRunner } from '@/domain/dev/dev.init.runner';
import { UserModule } from '@/domain/user/user.module';

@Module({
  controllers: [DevController],
  providers: [DevInitRunner],
  imports: [UserModule],
})
export class DevModule {}
