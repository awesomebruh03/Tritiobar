import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Article, PrismaClient } from '@prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';
import { CreateOrFindAuthor } from '../utils/createOrFindAuthor.utils';
import { CreateOrFindTags } from '../utils/createOrFindTags.utils';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  private prisma = new PrismaClient();

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

  async create(createArticleDto: CreateArticleDto) {
    try {
      const { tags, ...articleData } = createArticleDto;
  
      // Ensure tags is defined and is an array
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
  
      // Create the article with the associated tags
      return this.prisma.article.create({
        data: {
          ...articleData,
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
  }

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
