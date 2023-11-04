import { Injectable } from '@nestjs/common';
import { FileAuthorityRepository } from '@/domain/permission/fileauthority/persistence/FileAuthorityRepository';
import { FileAuthorityCreation } from '@/domain/permission/fileauthority/persistence/types';

@Injectable()
export class FileAuthorityService {
  constructor(
    private readonly fileAuthorityRepository: FileAuthorityRepository,
  ) {}

  create(creation: FileAuthorityCreation) {
    // TODO: 같은 account 중복 금지 로직 추가

    return this.fileAuthorityRepository.create(creation);
  }

  findById(id: number) {
    return this.fileAuthorityRepository.findById(id);
  }

  findByFileId(fileId: number) {
    return this.fileAuthorityRepository.findByFileId(fileId);
  }
}
