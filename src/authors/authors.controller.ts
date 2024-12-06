import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/CreateAuthorDto';
import { UpdateAuthorDto } from './dto/UpdateAuthorDto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  fetchAuthors() {
    return this.authorsService.fetchAuthorsWithoutArticles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(String(id));
  }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(String(id), updateAuthorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.authorsService.delete(String(id));
  }
}
