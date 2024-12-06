import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/CreateAuthorDto';
import { UpdateAuthorDto } from './dto/UpdateAuthorDto';

@Injectable()
export class AuthorsService {
  private authors = [];

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    const author = this.authors.find((auth) => auth.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = {
      id: Date.now(),
      ...createAuthorDto,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const authorIndex = this.authors.findIndex((auth) => auth.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...updateAuthorDto,
    };
    return this.authors[authorIndex];
  }

  delete(id: number) {
    const authorIndex = this.authors.findIndex((auth) => auth.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return this.authors.splice(authorIndex, 1);
  }
}