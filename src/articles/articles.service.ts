import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  private articles = [];

  findAll() {
    return this.articles;
  }

  findOne(id: number) {
    const article = this.articles.find((art) => art.id === id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  create(createArticleDto: CreateArticleDto) {
    const newArticle = {
      id: Date.now(),
      ...createArticleDto,
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    const articleIndex = this.articles.findIndex((art) => art.id === id);
    if (articleIndex === -1) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    this.articles[articleIndex] = {
      ...this.articles[articleIndex],
      ...updateArticleDto,
    };
    return this.articles[articleIndex];
  }

  delete(id: number) {
    const articleIndex = this.articles.findIndex((art) => art.id === id);
    if (articleIndex === -1) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return this.articles.splice(articleIndex, 1);
  }
}
