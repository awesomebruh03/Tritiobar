import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './articles.service';
import { NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an article', () => {
    const createArticleDto: CreateArticleDto = {
      title: 'Test Article',
      authorId: '1',
      publishedDate: new Date().toISOString(),
      content: 'Test content',
      tags: ['test'],
      category: 'test',
      images: ['image1.jpg'],
    };
    const article = service.create(createArticleDto);
    expect(article).toMatchObject(createArticleDto);
    expect(article).toHaveProperty('id');
  });

  it('should find all articles', () => {
    const articles = service.findAll();
    expect(articles).toBeInstanceOf(Array);
  });

  it('should find one article by id', () => {
    const createArticleDto: CreateArticleDto = {
      title: 'Test Article',
      authorId: '1',
      publishedDate: new Date().toISOString(),
      content: 'Test content',
      tags: ['test'],
      category: 'test',
      images: ['image1.jpg'],
    };
    const article = service.create(createArticleDto);
    const foundArticle = service.findOne(article.id);
    expect(foundArticle).toMatchObject(createArticleDto);
  });

  it('should update an article', () => {
    const createArticleDto: CreateArticleDto = {
      title: 'Test Article',
      authorId: '1',
      publishedDate: new Date().toISOString(),
      content: 'Test content',
      tags: ['test'],
      category: 'test',
      images: ['image1.jpg'],
    };
    const article = service.create(createArticleDto);
    const updateArticleDto: UpdateArticleDto = { title: 'Updated Title' };
    const updatedArticle = service.update(article.id, updateArticleDto);
    expect(updatedArticle.title).toBe('Updated Title');
  });

  it('should delete an article', () => {
    const createArticleDto: CreateArticleDto = {
      title: 'Test Article',
      authorId: '1',
      publishedDate: new Date().toISOString(),
      content: 'Test content',
      tags: ['test'],
      category: 'test',
      images: ['image1.jpg'],
    };
    const article = service.create(createArticleDto);
    service.delete(article.id);
    expect(() => service.findOne(article.id)).toThrow(NotFoundException);
  });
});
