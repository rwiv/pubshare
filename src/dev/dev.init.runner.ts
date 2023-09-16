import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {UserService} from "../user/domain/user.service";

@Injectable()
export class DevInitRunner implements OnApplicationBootstrap {
  constructor(private userService: UserService) {}

  async onApplicationBootstrap(): Promise<void> {
    const users = await this.userService.findAll();
    if (users.length === 0) {
      await this.userService.create({
        email: 'test1@gmail.com',
        password: '1234',
        certified: true,
        role: 'ADMIN',
      });

      await this.userService.create({
        email: 'test2@gmail.com',
        password: '1234',
        certified: false,
        role: 'MEMBER',
      });
    }

    console.log(users);
  }
}
