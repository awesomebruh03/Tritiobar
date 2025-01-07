import { AuthorsService } from '../authors/authors.service';

const authorsService = new AuthorsService();

const createOrFindAuthor = async (param: {
  authorName: string;
  email: string;
}) => {
  let author = await authorsService.findAuthorByEmail(
    param.email,
    param.authorName,
  );

  if (author) {
    return { id: author.id };
  }

  author = await authorsService.create(param);

  return { id: author.id };
};

export default createOrFindAuthor;
