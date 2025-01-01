import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAuthorDto } from './dto/CreateAuthorDto';
import { UpdateAuthorDto } from './dto/UpdateAuthorDto';

@Injectable()
export class AuthorsService {
  private prisma = new PrismaClient();

  fetchAuthorsWithoutArticles = async () => {
    return this.prisma.author.findMany({
      select: {
        id: true,
        authorName: true,
        email: true,
        profilePicture: true,
        bio: true,
        createdAt: true,
        articles: true,
        updatedAt: true,
      },
    });
  };

  findOne = async (id: string) => {
    const author = this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  };

  create = async (createAuthorDto: CreateAuthorDto) => {
    return this.prisma.author.create({
      data: {
        ...createAuthorDto,
      },
    });
  };

  update = async (id: string, updateAuthorDto: UpdateAuthorDto) => {
    return this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  };

  delete = async (id: string) => {
    return this.prisma.author.delete({
      where: { id },
    });
  };
  findAllArticlesByAuthor = async (id: string) => {
    return this.prisma.author
      .findUnique({
        where: { id },
      })
      .articles();
  };
  async findAuthorByEmail(email: string, authorName: string) {
    return this.prisma.author.findFirst({
      where: {
        email,
        authorName,
      },
      select: {
        id: true,
        authorName: true,
      },
    });
  }

  async createOrFindAuthor(param: { authorName: string; email: string }) {
    let author = await this.findAuthorByEmail(param.email, param.authorName);

    if (author) {
      return { id: author.id, authorName: author.authorName }; // Corrected to return the actual authorName
    }

    author = await this.create(param);

    return author; // This will return the full author object created
  }
}
