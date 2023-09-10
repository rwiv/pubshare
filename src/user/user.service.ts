import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUser, UpdateUser } from './types/form';
import { UserModel } from './types/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUser: CreateUser): Promise<UserModel> {
    const { email, password } = createUser;
    return this.prismaService.user.create({
      data: { email, password },
    });
  }

  findAll(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUser: UpdateUser) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
