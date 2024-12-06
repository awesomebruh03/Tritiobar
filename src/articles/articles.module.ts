import { Module } from '@nestjs/common';
import { ArticleController } from './articles.controller';
import { ArticleService } from './articles.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticlesModule {}