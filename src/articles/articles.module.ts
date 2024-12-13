import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleController } from './articles.controller';

@Module({
  providers: [ArticlesService],
  controllers: [ArticleController],
})
export class ArticlesModule {}
