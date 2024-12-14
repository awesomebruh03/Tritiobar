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
}
