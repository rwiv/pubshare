import { Injectable } from '@nestjs/common';
import { FileTagRepository } from '@/domain/file/tag/filetag/persistence/FileTagRepository';
import { TagService } from '@/domain/file/tag/tag/domain/TagService';
import { FileTagCreationByTagName } from '@/domain/file/tag/filetag/domain/types';

@Injectable()
export class FileTagService {
  constructor(
    private readonly fileTagRepository: FileTagRepository,
    private readonly tagService: TagService,
  ) {}

  async create(creation: FileTagCreationByTagName) {
    let tag = await this.tagService.findByName(creation.tagName);
    if (tag === null) {
      tag = await this.tagService.create({ name: creation.tagName });
    }

    return this.fileTagRepository.create({
      file: { connect: { id: creation.fileId } },
      tag: { connect: { id: tag.id } },
    });
  }

  findByFileId(fileId: number) {
    return this.fileTagRepository.findByFileId(fileId);
  }

  findByTagId(tagId: number) {
    return this.fileTagRepository.findByTagId(tagId);
  }
}
