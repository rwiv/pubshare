import { Module } from '@nestjs/common';
import { DevModule } from '@/domain/dev/dev.module';
import { AccessModule } from '@/domain/access/access.module';
import { AuthModule } from '@/auth/auth.module';
import { AccountModule } from '@/domain/account/account.module';
import { FileModule } from '@/domain/file/file/file.module';
import { FileCommentModule } from '@/domain/file/comment/file.comment.module';

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
