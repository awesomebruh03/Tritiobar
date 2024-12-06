import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}
  private tags = [];

  findAll() {
    return this.tags;
  }

  async findTagsByArticleId(articleId: string) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
      include: { tags: true },
    });
    return article?.tags || [];
  }

}
