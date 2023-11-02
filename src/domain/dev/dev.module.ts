import { Module } from '@nestjs/common';
import { DevController } from '@/domain/dev/dev.controller';
import { DevInitRunner } from '@/domain/dev/dev.init.runner';
import { AccountModule } from '@/domain/account/account.module';

@Module({
  controllers: [DevController],
  providers: [DevInitRunner],
  imports: [AccountModule],
})
export class DevModule {}
