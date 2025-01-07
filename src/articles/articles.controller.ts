import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticleService) {}

  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }

  @Get('top-five-articles')
  getTopFiveArticles() {
    return this.articlesService.getTopFiveArticles();
  }
  @Get('banner-articles')
  getBaner() {
    return this.articlesService.getTopFiveArticles();
  }
}
