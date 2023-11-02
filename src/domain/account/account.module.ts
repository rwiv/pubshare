import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma.service';
import { AccountController } from '@/domain/account/web/account.controller';
import { AccountService } from '@/domain/account/domain/account.service';
import { AccountRepository } from '@/domain/account/persistence/account.repository';
import { AuthenticationService } from '@/auth/authentication/authentication.service';

@Module({
  controllers: [AccountController],
  providers: [
    AccountRepository,
    AccountService,
    PrismaService,
    AuthenticationService,
  ],
  exports: [AccountService],
})
export class AccountModule {}
