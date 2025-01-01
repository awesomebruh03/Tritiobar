import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/CreateTagDto';
import { UpdateTagDto } from './dto/UpdateTagDto';

@Injectable()
export class TagsService {
  private prisma = new PrismaService();
  CreateTag = async (createTagDto: CreateTagDto) => {
    return this.prisma.tag.create({
      data: {
        name: createTagDto.name,
      },
    });
  };

  FindAllTags = async () => {
    return this.prisma.tag.findMany();
  };

  UpdateTags = async (id: string, updateTagDto: UpdateTagDto) => {
    return this.prisma.tag.update({
      where: { id },
      data: {
        name: updateTagDto.name,
      },
    });
  };
  findTagsByName = async (tagName: string) => {
    return this.prisma.tag.findUnique({
      where: { name: tagName },
      select: {
        id: true,
        name: true,
      },
    });
  };
  createOrFindTag = async (tagName: string) => {
    let tag = await this.findTagsByName(tagName);
    if (!tag) {
      tag = await this.CreateTag({ name: tagName });
    }
    return tag;
  };
}
