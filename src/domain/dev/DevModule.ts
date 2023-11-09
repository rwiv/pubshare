import { Module } from '@nestjs/common';
import { DevController } from '@/domain/dev/DevController';
import { DevInitRunner } from '@/domain/dev/DevInitRunner';
import { AccountModule } from '@/domain/account/AccountModule';
import { RoleModule } from '@/domain/permission/role/RoleModule';

@Module({
  controllers: [DevController],
  providers: [DevInitRunner],
  imports: [AccountModule, RoleModule],
})
export class DevModule {}
