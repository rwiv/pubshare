import { Module } from '@nestjs/common';
import { DevController } from '@/domain/dev/DevController';
import { DevInitRunner } from '@/domain/dev/DevInitRunner';
import { AccountModule } from '@/domain/account/AccountModule';

@Module({
  controllers: [DevController],
  providers: [DevInitRunner],
  imports: [AccountModule],
})
export class DevModule {}
