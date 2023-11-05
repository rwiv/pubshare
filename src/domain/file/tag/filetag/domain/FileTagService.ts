import { Injectable } from '@nestjs/common';
import { FileTagRepository } from '@/domain/file/tag/filetag/persistence/FileTagRepository';
import { TagService } from '@/domain/file/tag/tag/domain/TagService';

@Injectable()
export class FileTagService {
  constructor(
    private readonly fileTagRepository: FileTagRepository,
    private readonly tagService: TagService,
  ) {}

  async create(creation: FileTagCreationRequest) {
    let tag = await this.tagService.findByName(creation.tagName);
    if (tag === null) {
      tag = await this.tagService.create({ name: creation.tagName });
    }

    return this.fileTagRepository.create({
      fileId: creation.fildId,
      tagId: tag.id,
    });
  }

  findByFileId(fileId: number) {
    return this.fileTagRepository.findByFileId(fileId);
  }

  findByTagId(tagId: number) {
    return this.fileTagRepository.findByTagId(tagId);
  }
}
