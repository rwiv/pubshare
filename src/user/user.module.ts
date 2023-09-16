import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserController } from './web/user.controller';
import { PrismaService } from '../misc/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
