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
import { UserCreation, UserUpdate } from './forms';
import { UserModel } from '../persistence/prisma';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUser: UserCreation): Promise<UserModel> {
    return this.userService.create(createUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: UserUpdate) {
    return this.userService.update(+id, updateUser);
  }

  @Patch('certificate/:id')
  certificate(@Param('id') id: string) {
    return this.userService.certificate(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
