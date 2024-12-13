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

  it('should create an article', async () => {
    const createArticleDto: CreateArticleDto = {
      title: 'Test Article',
      authorId: '1',
      publishedDate: new Date(), // Ensure publishedDate is a Date object
      content: 'Test content',
      tags: ['test'],
      category: 'test',
      images: ['image1.jpg'],
    };
    const article = await service.create(createArticleDto);
    expect(article).toMatchObject(createArticleDto);
    expect(article).toHaveProperty('id');
  });

  it('should find all articles', async () => {
    const articles = await service.findAll();
    expect(articles).toBeInstanceOf(Array);
  });

  it('should find one article by id', async () => {
    const createArticleDto: CreateArticleDto = {
      title: 'Test Article',
      authorId: '1',
      publishedDate: new Date(), // Ensure publishedDate is a Date object
      content: 'Test content',
      tags: ['test'],
      category: 'test',
      images: ['image1.jpg'],
    };

    it('should update an article', async () => {
      const createArticleDto: CreateArticleDto = {
        title: 'Test Article',
        authorId: '1',
        publishedDate: new Date(),
        content: 'Test content',
        tags: ['test'],
        category: 'test',
        images: ['image1.jpg'],
      };
      const article = await service.create(createArticleDto);
      const updateArticleDto: UpdateArticleDto = { title: 'Updated Title' };
      const updatedArticle = await service.update(article.id, updateArticleDto);
      expect(updatedArticle.title).toBe('Updated Title');
    });

    it('should delete an article', async () => {
      const createArticleDto: CreateArticleDto = {
        title: 'Test Article',
        authorId: '1',
        publishedDate: new Date(),
        content: 'Test content',
        tags: ['test'],
        category: 'test',
        images: ['image1.jpg'],
      };
      const article = await service.create(createArticleDto);
      await service.delete(article.id);
      expect(() => service.findOne(article.id)).toThrow(NotFoundException);
    });
  });
});
