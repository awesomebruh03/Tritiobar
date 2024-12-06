import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get('article/:articleId')
  findTagsByArticleId(@Param('articleId') articleId: string) {
    return this.tagsService.findTagsByArticleId(articleId);
  }
}