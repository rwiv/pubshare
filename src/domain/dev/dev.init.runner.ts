import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/account.service';

@Injectable()
export class DevInitRunner implements OnApplicationBootstrap {
  constructor(private accountService: AccountService) {}

  async onApplicationBootstrap(): Promise<void> {
    const accounts = await this.accountService.findAll();
    if (accounts.length === 0) {
      await this.accountService.create({
        email: 'test1@gmail.com',
        password: '1234',
        certified: true,
        role: 'ADMIN',
      });

      await this.accountService.create({
        email: 'test2@gmail.com',
        password: '1234',
        certified: false,
        role: 'MEMBER',
      });
    }

    console.log(accounts);
  }
}
