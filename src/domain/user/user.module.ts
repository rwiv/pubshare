import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma.service';
import { UserController } from '@/domain/user/web/user.controller';
import { UserService } from '@/domain/user/domain/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
