import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { DevInitRunner } from './dev.init.runner';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [DevController],
  providers: [DevInitRunner],
  imports: [UserModule],
})
export class DevModule {}
