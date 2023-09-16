import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../domain/user.service';
import { UserCreation, UserResponse, UserUpdate } from './types';
import { Role } from '../domain/user.role';
import { UserModel } from '../persistence/prisma';
import { UserModule } from '../user.module';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private convert(user: UserModel): UserResponse {
    const { id, email, certified, role } = user;
    const r = role as Role;
    return { id, email, certified, role: r };
  }

  @Post()
  async create(@Body() createUser: UserCreation): Promise<UserResponse> {
    const user: UserModel = await this.userService.create(createUser);
    return this.convert(user);
  }

  @Get()
  async findAll() {
    const users: UserModule[] = await this.userService.findAll();
    return users.map((user: UserModel) => this.convert(user));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user: UserModel = await this.userService.findOne(id);
    return this.convert(user);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUser: UserUpdate) {
    const user: UserModel = await this.userService.update(id, updateUser);
    return this.convert(user);
  }

  @Patch('certificate/:id')
  async certificate(@Param('id', ParseIntPipe) id: number) {
    const user: UserModel = await this.userService.certificate(id);
    return this.convert(user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const user: UserModel = await this.userService.delete(id);
    return this.convert(user);
  }
}
