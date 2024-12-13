import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/CreateTagDto';
import { UpdateTagDto } from './dto/UpdateTagDto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.CreateTag(createTagDto);
  }
  @Put(':id')
  updateTag(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.UpdateTags(id, updateTagDto);
  }
  @Get()
  findAllTags() {
    return this.tagsService.FindAllTags();
  }
  @Put(':id')
  updateTags(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.UpdateTags(id, updateTagDto);
  }
}
