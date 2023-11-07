import { Module } from '@nestjs/common';
import { DevController } from '@/domain/dev/DevController';
import { DevInitRunner } from '@/domain/dev/DevInitRunner';
import { AccountModule } from '@/domain/account/AccountModule';
import { PolicyModule } from '@/domain/permission/policy/PolicyModule';

@Module({
  controllers: [DevController],
  providers: [DevInitRunner],
  imports: [AccountModule, PolicyModule],
})
export class DevModule {}
