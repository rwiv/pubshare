import { Injectable } from '@nestjs/common';
import {
  AccountCreation,
  AccountUpdate,
} from '@/domain/account/persistence/types';
import { PrismaService } from '@/misc/prisma/PrismaService';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: AccountCreation) {
    return this.prisma.account.create({ data: creation });
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  findById(id: number) {
    return this.prisma.account.findUnique({ where: { id } });
  }

  findByUsername(username: string) {
    return this.prisma.account.findUnique({ where: { email: username } });
  }

  update(id: number, update: AccountUpdate) {
    return this.prisma.account.update({
      where: { id },
      data: update,
    });
  }

  certificate(id: number) {
    return this.prisma.account.update({
      where: { id },
      data: { certified: true },
    });
  }

  delete(id: number) {
    return this.prisma.account.delete({ where: { id } });
  }
}
