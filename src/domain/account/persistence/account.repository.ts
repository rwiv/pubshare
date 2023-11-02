import { Injectable } from '@nestjs/common';
import { AccountCreation, AccountUpdate } from '@/domain/account/domain/types';
import { AccountModel } from '@/domain/account/persistence/prisma';
import { PrismaService } from '@/misc/prisma.service';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: AccountCreation): Promise<AccountModel> {
    return this.prisma.account.create({ data: creation });
  }

  findAll(): Promise<AccountModel[]> {
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
