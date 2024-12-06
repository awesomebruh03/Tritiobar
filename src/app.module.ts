import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthorsModule } from './authors/authors.module';
import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';
import { TagsModule } from './tags/tags.module';


@Module({
  imports: [PrismaModule, ArticlesModule, AuthorsModule, TagsModule],
  controllers: [AppController, TagsController],
  providers: [AppService, TagsService],
})
export class AppModule {}
