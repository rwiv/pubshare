import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/domain/permission/role/persistence/RoleRepository';
import { RoleCreation } from '@/domain/permission/role/persistence/types';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  create(creation: RoleCreation) {
    return this.roleRepository.create(creation);
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  findById(id: number) {
    return this.roleRepository.findById(id);
  }

  delete(id: number) {
    return this.roleRepository.delete(id);
  }
}
