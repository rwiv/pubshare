import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { RoleCreation } from '@/domain/permission/role/domain/types';

@Controller('api/perm/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() creation: RoleCreation) {
    return this.roleService.create(creation);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findById(id);
  }

  @Get('account-id/:accountId')
  findByAccountId(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.roleService.findByAccountId(accountId);
  }
}
