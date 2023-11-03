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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import {
  Account,
  AccountCreation,
  AccountUpdate,
} from '@/domain/account/persistence/types';
import { AccountType } from '@/domain/account/persistence/accountType';
import { AuthenticationService } from '@/auth/authentication/AuthenticationService';
import { LoginRequest } from '@/auth/authentication/types';
import { AccountResponse } from '@/domain/account/web/types';

@Controller('api/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthenticationService,
  ) {}

  private convert(account: Account): AccountResponse {
    const { id, email, certified, type } = account;
    const r = type as AccountType;
    return { id, email, certified, type: r };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @Post()
  async create(@Body() creation: AccountCreation): Promise<AccountResponse> {
    const account = await this.accountService.create(creation);
    return this.convert(account);
  }

  @Get()
  async findAll() {
    const accounts = await this.accountService.findAll();
    return accounts.map((account: Account) => this.convert(account));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.findById(id);
    return this.convert(account);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: AccountUpdate,
  ) {
    const account = await this.accountService.update(id, update);
    return this.convert(account);
  }

  @Patch('certificate/:id')
  async certificate(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.certificate(id);
    return this.convert(account);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.delete(id);
    return this.convert(account);
  }
}
