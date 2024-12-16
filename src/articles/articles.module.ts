import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ArticleService, PrismaService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
