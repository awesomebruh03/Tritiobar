import {
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsUrl,
} from 'class-validator';
export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  authorId: string;

  @IsDateString()
  publishedDate: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  category: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  articleType?: string;
}
