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

  createArticle = async (
    createArticleDto: CreateArticleDto,
  ): Promise<Article> => {
    const createOrFindAuthor = new CreateOrFindAuthor();
    const createOrFindTags = new CreateOrFindTags();

    // Destructure properties from the DTO
    const {
      title,
      content,
      authorName,
      authorEmail,
      publishedDate,
      tags: tagNames,
      category,
      images,
      videoUrl,
      articleType,
    } = createArticleDto;

    // Step 1: Use createOrFindAuthor to get the author
    const author = await createOrFindAuthor.createOrFindAuthor({
      authorName,
      email: authorEmail || '', // Pass an empty string if email is undefined
    });

    // Step 2: Use createOrFindTag to get the tags
    const tags = [];
    for (const tagName of tagNames) {
      const tag = await createOrFindTags.createOrFindTag(tagName);
      tags.push({ id: tag.id });
    }

    // Step 3: Create the article
    return this.prisma.article.create({
      data: {
        title,
        content,
        publishedDate: new Date(publishedDate), // Convert ISO string to Date
        category,
        images,
        videoUrl: videoUrl || null, // Set to null if undefined
        articleType: articleType || 'regular', // Default to 'regular' if not provided
        author: {
          connect: { id: author.id }, // Connect the article to the author
        },
        tags: {
          connect: tags, // Connect the article to the tags
        },
      },
    });
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
