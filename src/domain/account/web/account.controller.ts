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
  AccountCreation,
  AccountResponse,
  AccountUpdate,
} from '@/domain/account/domain/types';
import { AccountModel } from '@/domain/account/persistence/prisma';
import { AccountRole } from '@/domain/account/persistence/account.role';
import { AccountModule } from '@/domain/account/account.module';
import { AuthenticationService } from '@/auth/authentication/authentication.service';
import { LoginRequest } from '@/auth/authentication/types';

@Controller('api/accounts')
export class AccountController {
  constructor(
    private readonly userService: AccountService,
    private readonly authService: AuthenticationService,
  ) {}

  private convert(user: AccountModel): AccountResponse {
    const { id, email, certified, role } = user;
    const r = role as AccountRole;
    return { id, email, certified, role: r };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @Post()
  async create(@Body() createUser: AccountCreation): Promise<AccountResponse> {
    const user: AccountModel = await this.userService.create(createUser);
    return this.convert(user);
  }

  @Get()
  async findAll() {
    const users: AccountModule[] = await this.userService.findAll();
    return users.map((user: AccountModel) => this.convert(user));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user: AccountModel = await this.userService.findById(id);
    return this.convert(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: AccountUpdate,
  ) {
    const user: AccountModel = await this.userService.update(id, updateUser);
    return this.convert(user);
  }

  @Patch('certificate/:id')
  async certificate(@Param('id', ParseIntPipe) id: number) {
    const user: AccountModel = await this.userService.certificate(id);
    return this.convert(user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const user: AccountModel = await this.userService.delete(id);
    return this.convert(user);
  }
}
