import { IsString, IsEmail, IsNotEmpty, IsUrl } from 'class-validator';
export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsEmail()
  email?: string;

  @IsUrl()
  profilePicture?: string;

  @IsString()
  bio?: string;
}
