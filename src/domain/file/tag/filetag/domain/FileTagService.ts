import { Injectable } from '@nestjs/common';
import { FileTagRepository } from '@/domain/file/tag/filetag/persistence/FileTagRepository';
import { TagService } from '@/domain/file/tag/tag/domain/TagService';
import {
  FileTagCreationByTagName,
  FileTagResponse,
} from '@/domain/file/tag/filetag/domain/types';

@Injectable()
export class FileTagService {
  constructor(
    private readonly fileTagRepository: FileTagRepository,
    private readonly tagService: TagService,
  ) {}

  async create(creation: FileTagCreationByTagName): Promise<FileTagResponse> {
    let tag = await this.tagService.findByName(creation.tagName);
    if (tag === null) {
      tag = await this.tagService.create({ name: creation.tagName });
    }

    const fileTag = await this.fileTagRepository.create({
      file: { connect: { id: creation.fileId } },
      tag: { connect: { id: tag.id } },
    });
    return { id: fileTag.id, fileId: fileTag.fileId, tag };
  }

  async findByFileId(fileId: number) {
    const fileTags = await this.fileTagRepository.findByFileId(fileId);
    const result: FileTagResponse[] = [];
    for (const fileTag of fileTags) {
      const tag = await this.tagService.findById(fileTag.tagId);
      result.push({ id: fileTag.id, fileId: fileTag.fileId, tag });
    }
    return result;
  }

  async findByTagId(tagId: number) {
    const fileTags = await this.fileTagRepository.findByTagId(tagId);
    const result: FileTagResponse[] = [];
    for (const fileTag of fileTags) {
      const tag = await this.tagService.findById(fileTag.tagId);
      result.push({ id: fileTag.id, fileId: fileTag.fileId, tag });
    }
    return result;
  }

  async delete(id: number) {
    const fileTag = await this.fileTagRepository.delete(id);
    const tag = await this.tagService.findById(fileTag.tagId);
    return { id: fileTag.id, fileId: fileTag.fileId, tag };
  }
}
