import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../misc/prisma.service';
import { UserCreation, UserUpdate } from '../web/types';
import { UserModel } from '../persistence/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(userCreation: UserCreation): Promise<UserModel> {
    return this.prisma.user.create({ data: userCreation });
  }

  findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { email: username } });
  }

  update(id: number, userUpdate: UserUpdate) {
    return this.prisma.user.update({
      where: { id },
      data: userUpdate,
    });
  }

  async certificate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { certified: true },
    });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
