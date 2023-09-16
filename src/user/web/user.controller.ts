import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from '../domain/user.service';
import { UserCreation, UserResponse, UserUpdate } from './types';
import { Role } from '../domain/user.role';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: UserCreation): Promise<UserResponse> {
    const { id, email, certified, role } =
      await this.userService.create(createUser);
    const r = role as Role;
    return { id, email, certified, role: r };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(({ id, email, certified }) => ({ id, email, certified }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService
      .findOne(+id)
      .then(({ id, email, certified }) => ({ id, email, certified }));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: UserUpdate) {
    return this.userService
      .update(+id, updateUser)
      .then(({ id, email, certified }) => ({ id, email, certified }));
  }

  @Patch('certificate/:id')
  certificate(@Param('id') id: string) {
    return this.userService
      .certificate(+id)
      .then(({ id, email, certified }) => ({ id, email, certified }));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService
      .delete(+id)
      .then(({ id, email, certified }) => ({ id, email, certified }));
  }
}
