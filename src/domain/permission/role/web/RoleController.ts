import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RoleCreation } from '@/domain/permission/role/persistence/types';
import { RoleService } from '@/domain/permission/role/domain/RoleService';

@Controller('api/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() creation: RoleCreation) {
    return this.roleService.create(creation);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
