import { Injectable } from '@nestjs/common';
import { FileAuthorityRepository } from '@/domain/permission/fileauthority/persistence/FileAuthorityRepository';
import { FileAuthorityCreation } from '@/domain/permission/fileauthority/persistence/types';

@Injectable()
export class FileAuthorityService {
  constructor(
    private readonly fileAuthorityRepository: FileAuthorityRepository,
  ) {}

  create(creation: FileAuthorityCreation) {
    return this.fileAuthorityRepository.create(creation);
  }

  findById(id: number) {
    return this.fileAuthorityRepository.findById(id);
  }
}
