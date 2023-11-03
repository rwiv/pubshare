import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { AccountController } from '@/domain/account/web/AccountController';
import { AccountService } from '@/domain/account/domain/AccountService';
import { AccountRepository } from '@/domain/account/persistence/AccountRepository';
import { AuthenticationService } from '@/auth/authentication/AuthenticationService';

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
