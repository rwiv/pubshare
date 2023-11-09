import { Injectable } from '@nestjs/common';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { RoleCreation } from '@/domain/permission/role/persistence/types';

@Injectable()
export class RoleDummyBuilder {
  constructor(private readonly roleService: RoleService) {}

  pl(n: number) {
    return this.roleService.create(this.plC(n));
  }

  plC(n: number): RoleCreation {
    return {
      name: `role${n}`,
    };
  }
}
