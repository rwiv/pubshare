import { Injectable } from '@nestjs/common';
import { TagRepository } from '@/domain/file/tag/tag/persistence/TagRepository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  create(creation: TagCreation) {
    return this.tagRepository.create(creation);
  }

  findById(id: number) {
    return this.tagRepository.findById(id);
  }

  findByName(name: string) {
    return this.tagRepository.findByName(name);
  }

  delete(id: number) {
    return this.tagRepository.delete(id);
  }
}
