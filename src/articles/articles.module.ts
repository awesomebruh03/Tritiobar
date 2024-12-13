import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleController } from './articles.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ArticlesService, PrismaService],
  controllers: [ArticleController],
})
export class ArticlesModule {}
