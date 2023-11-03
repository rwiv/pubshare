import { Module } from '@nestjs/common';
import { DevModule } from '@/domain/dev/DevModule';
import { AccessModule } from '@/domain/access/AccessModule';
import { AuthModule } from '@/auth/AuthModule';
import { AccountModule } from '@/domain/account/AccountModule';
import { FileModule } from '@/domain/file/file/FileModule';
import { FileCommentModule } from '@/domain/file/comment/FileCommentModule';

@Module({
  imports: [
    AccountModule,
    DevModule,
    AccessModule,
    AuthModule,
    FileModule,
    FileCommentModule,
  ],
})
export class AppModule {}
