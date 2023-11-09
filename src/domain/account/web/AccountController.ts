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
import { accountTypes } from '@/domain/account/persistence/accountType';
import { AuthenticationService } from '@/auth/authentication/AuthenticationService';
import { LoginRequest, AuthToken } from '@/auth/authentication/types';
import { AccountResponse } from '@/domain/account/web/types';
import { AuthGuard } from '@/auth/authorization/AuthGuard';
import { Auth } from '@/auth/Auth';

@Controller('api/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthenticationService,
  ) {}

  @Post('signup')
  async signup(@Body() creation: AccountCreation): Promise<AccountResponse> {
    const account = await this.accountService.create(creation);
    return this.accountService.convertResponse(account);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getProfile(@Auth() auth: AuthToken) {
    const account = await this.accountService.findByUsername(auth.username);
    if (auth.type === accountTypes.GUEST && account === null) {
      const guest = await this.accountService.create({
        username: 'guest',
        password: 'guest',
        nickname: 'guest',
        certified: false,
        type: accountTypes.GUEST,
      });
      return this.accountService.convertResponse(guest);
    }
    return this.accountService.convertResponse(account);
  }

  @Get()
  async findAll() {
    const accounts = await this.accountService.findAll();
    return accounts.map((account: Account) => this.accountService.convertResponse(account));
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.findById(id);
    return this.accountService.convertResponse(account);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: AccountUpdate,
  ) {
    const account = await this.accountService.update(id, update);
    return this.accountService.convertResponse(account);
  }

  @Patch('certificate/:id')
  async certificate(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.certificate(id);
    return this.accountService.convertResponse(account);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const account = await this.accountService.delete(id);
    return this.accountService.convertResponse(account);
  }
}
