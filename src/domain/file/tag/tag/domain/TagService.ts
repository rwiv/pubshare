import { Injectable } from '@nestjs/common';
import { TagRepository } from '@/domain/file/tag/tag/persistence/TagRepository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  create(creation: TagCreation) {
    return this.tagRepository.create(creation);
  }

  findByName(name: string) {
    return this.tagRepository.fundByName(name);
  }
}
