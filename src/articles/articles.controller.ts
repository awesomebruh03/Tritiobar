import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesController {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.article.findMany();
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    const { tags, ...articleData } = createArticleDto;

    // Ensure all tags exist or create them if they don't
    const tagRecords = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await this.prisma.tag.findUnique({
          where: { name: tagName },
        });
        if (!tag) {
          tag = await this.prisma.tag.create({
            data: { name: tagName },
          });
        }
        return tag;
      }),
    );
    // Ensure the author exists or create them if they don't
    let author = await this.prisma.author.findUnique({
      where: { id: createArticleDto.authorId },
    });
    if (!author) {
      throw new NotFoundException(
        `Author with ID ${createArticleDto.authorId} not found`,
      );
      author = await this.prisma.author.create({
        data: { authorName: createArticleDto.authorName },
      });
    }

    // Create the article with the associated tags
    return this.prisma.article.create({
      data: {
        ...articleData,
        tags: {
          connect: tagRecords.map((tag) => ({ id: tag.id })),
        },
      },
    });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const { tags, ...updateData } = updateArticleDto;

    // Ensure all tags exist or create them if they don't
    const tagRecords = tags
      ? await Promise.all(
          tags.map(async (tagName) => {
            let tag = await this.prisma.tag.findUnique({
              where: { name: tagName },
            });
            if (!tag) {
              tag = await this.prisma.tag.create({
                data: { name: tagName },
              });
            }
            return tag;
          }),
        )
      : [];

    // Update the article with the associated tags
    return this.prisma.article.update({
      where: { id },
      data: {
        ...updateData,
        tags: tags
          ? {
              set: tagRecords.map((tag) => ({ id: tag.id })),
            }
          : undefined,
      },
    });
  }

  async delete(id: string) {
    const article = await this.prisma.article.delete({
      where: { id },
    });
    return article;
  }
}
