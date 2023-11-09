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
  UseGuards,
} from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import {
  Account,
  AccountCreation,
  AccountUpdate,
} from '@/domain/account/persistence/types';
import {AccountType, accountTypeValues} from '@/domain/account/persistence/accountType';
import { AuthenticationService } from '@/auth/authentication/AuthenticationService';
import { LoginRequest, AuthToken } from '@/auth/authentication/types';
import { AccountResponse } from '@/domain/account/web/types';
import { AuthGuard } from '@/auth/authorization/AuthGuard';
import { Auth } from '@/auth/Auth';
import {defaultGuestAccount} from "@/auth/authentication/defaultGuestObj";

@Controller('api/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthenticationService,
  ) {}

  private convert(account: Account): AccountResponse {
    const { id, email, nickname, certified, type } = account;
    return { id, email, certified, nickname, type: type as AccountType };
  }

  @Post('signup')
  async signup(@Body() creation: AccountCreation): Promise<AccountResponse> {
    const account = await this.accountService.create(creation);
    return this.convert(account);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getProfile(@Auth() auth: AuthToken) {
    if (auth.type === accountTypeValues.GUEST) {
      return defaultGuestAccount;
    }
    const account = await this.accountService.findById(auth.id);
    return this.convert(account);
  }

  @Get()
  async findAll() {
    const accounts = await this.accountService.findAll();
    return accounts.map((account: Account) => this.convert(account));
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
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
