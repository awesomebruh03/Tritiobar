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
}
