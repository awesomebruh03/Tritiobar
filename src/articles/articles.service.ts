import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';
import createOrFindAuthor from '../utils/createOrFindAuthor.utils';
import createOrFindTag from '../utils/createOrFindTags.utils';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  private prisma = new PrismaClient();

  create = async (createArticleDto: CreateArticleDto) => {
    try {
      const { tags, authorName, authorEmail, ...articleData } =
        createArticleDto;

      // Find or create the author
      const author = await createOrFindAuthor({
        authorName,
        email: authorEmail,
      });

      // Ensure tags is defined and is an array
      const tagRecords = tags
        ? await Promise.all(
            tags.map(async (tagName) => {
              const tag = await createOrFindTag(tagName);
              return tag;
            }),
          )
        : [];

      // Create the article with the associated tags and author
      return this.prisma.article.create({
        data: {
          ...articleData,
          authorId: author.id,
          tags: {
            connect: tagRecords.map((tag) => ({ id: tag.id })),
          },
        },
      });
    } catch (error) {
      console.error('Error creating article:', error.message);
      console.error(error.stack);
      throw new Error('Internal server error');
    }
  };

  findAll = async () => {
    try {
      return await this.prisma.article.findMany();
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new InternalServerErrorException('Failed to fetch articles');
    }
  };

  findOne = async (id: string) => {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  };

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const { tags, authorId, ...updateData } = updateArticleDto;

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
        authorId: authorId || undefined,
        tags: tags
          ? {
              set: tagRecords.map((tag) => ({ id: tag.id })),
            }
          : undefined,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.article.delete({
      where: { id },
    });
  }

  async getTopFiveArticles() {
    return this.prisma.article.findMany({
      where: {
        articleType: 'topfive',
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }

  async getBaner() {
    return this.prisma.article.findMany({
      where: {
        articleType: 'banner',
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }
}
