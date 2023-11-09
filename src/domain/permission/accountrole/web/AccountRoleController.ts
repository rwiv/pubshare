import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AccountRoleService } from '@/domain/permission/accountrole/domain/AccountRoleService';
import { AccountRoleCreation } from '@/domain/permission/accountrole/domain/types';

@Controller('api/account-roles')
export class AccountRoleController {
  constructor(private readonly accountRoleService: AccountRoleService) {}

  @Post()
  create(@Body() creation: AccountRoleCreation) {
    return this.accountRoleService.create(creation);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.accountRoleService.findById(id);
  }

  @Get('account-id/:accountId')
  findByAccountId(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.accountRoleService.findByAccountId(accountId);
  }
}
