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
import { AccountService } from '@/domain/account/domain/account.service';
import {
  Account,
  AccountCreation,
  AccountResponse,
  AccountUpdate,
} from '@/domain/account/domain/types';
import { AccountRole } from '@/domain/account/persistence/account.role';
import { AuthenticationService } from '@/auth/authentication/authentication.service';
import { LoginRequest } from '@/auth/authentication/types';

@Controller('api/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthenticationService,
  ) {}

  private convert(account: Account): AccountResponse {
    const { id, email, certified, role } = account;
    const r = role as AccountRole;
    return { id, email, certified, role: r };
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
