import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ArticleService {
  private articles = [];
  private prisma = new PrismaClient();

  findAll = async () => {
    return this.prisma.article.findMany({
      select: {
        id: true,
        title: true,
        authorId: true,
        publishedDate: true,
        content: true,
        tags: true,
        category: true,
        images: true,
        videoUrl: true,
        author: true,
        createdAt: true,
        updatedAt: true,
        articleType: true,
      },
    });
  };

  findOne = (id: string) => {
    return this.prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        authorId: true,
        publishedDate: true,
        content: true,
        tags: true,
        category: true,
        images: true,
        videoUrl: true,
        author: true,
        createdAt: true,
        updatedAt: true,
        articleType: true,
      },
    });
  };

  create = async (createArticleDto: CreateArticleDto) => {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        author: {
          connect: { id: createArticleDto.authorId }, // Use `connect` to link the author
        },
        publishedDate: createArticleDto.publishedDate,
        content: createArticleDto.content,
        tags: {
          connect: createArticleDto.tags.map((tag) => ({ name: tag })), // Connect tags by their name
        },
        category: createArticleDto.category,
        images: createArticleDto.images,
        videoUrl: createArticleDto.videoUrl,
        articleType: createArticleDto.articleType,
      },
    });
  };

  update = async (id: string, updateArticleDto: UpdateArticleDto) => {
    try {
      return await this.prisma.article.update({
        where: { id },
        data: {
          title: updateArticleDto.title,
          author: {
            connect: { id: updateArticleDto.authorId },
          },
          publishedDate: updateArticleDto.publishedDate,
          content: updateArticleDto.content,
          tags: {
            connect: updateArticleDto.tags.map((tag) => ({ name: tag })),
          },
          category: updateArticleDto.category,
          images: updateArticleDto.images,
          videoUrl: updateArticleDto.videoUrl,
          articleType: updateArticleDto.articleType,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  };
  delete = async (id: string) => {
    try {
      return await this.prisma.article.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  };
}
