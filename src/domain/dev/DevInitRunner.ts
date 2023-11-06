import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import {accountTypeValues} from "@/domain/account/persistence/accountType";

@Injectable()
export class DevInitRunner implements OnApplicationBootstrap {
  constructor(private accountService: AccountService) {}

  async onApplicationBootstrap(): Promise<void> {
    const accounts = await this.accountService.findAll();
    if (accounts.length === 0) {
      await this.accountService.create({
        email: 'test1@gmail.com',
        password: '1234',
        nickname: 'test1',
        certified: false,
        type: accountTypeValues.MEMBER,
      });

      await this.accountService.create({
        email: 'test2@gmail.com',
        password: '1234',
        nickname: 'test2',
        certified: false,
        type: 'MEMBER',
      });

      await this.accountService.create({
        email: 'admin',
        password: 'admin',
        nickname: 'admin',
        certified: true,
        type: accountTypeValues.ADMIN,
      });

      await this.accountService.create({
        email: 'member',
        password: 'member',
        nickname: 'member',
        certified: true,
        type: accountTypeValues.MEMBER,
      });
    }

    console.log(accounts);
  }
}
