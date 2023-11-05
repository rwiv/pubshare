import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { AccountController } from '@/domain/account/web/AccountController';
import { AccountService } from '@/domain/account/domain/AccountService';
import { AccountRepository } from '@/domain/account/persistence/AccountRepository';
import { AuthenticationService } from '@/auth/authentication/AuthenticationService';
import { AccountDummyBuilder } from '@/domain/account/dev/AccountDummyBuilder';

@Module({
  controllers: [AccountController],
  providers: [
    AccountRepository,
    AccountService,
    AccountDummyBuilder,
    PrismaService,
    AuthenticationService,
  ],
  exports: [AccountService],
})
export class AccountModule {}
