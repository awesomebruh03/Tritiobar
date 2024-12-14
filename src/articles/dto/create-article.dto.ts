import {
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsUrl,
  IsIn,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsOptional() // Mark as optional if not always required
  @IsString()
  authorId?: string;

  @IsString()
  authorName: string;

  @IsDateString()
  publishedDate: string; // Ensure consistency with Prisma schema (use string if dates are stored as ISO strings)

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
  @IsIn(['banner', 'topfive', 'regular']) // Enforce valid values
  articleType?: 'banner' | 'topfive' | 'regular';
}
