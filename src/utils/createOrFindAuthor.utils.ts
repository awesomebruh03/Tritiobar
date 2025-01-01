import { AuthorsService } from '../authors/authors.service';

export class CreateOrFindAuthor {
  authorService = new AuthorsService();

  async createOrFindAuthor(param: { authorName: string; email: string }) {
    let author = await this.authorService.findAuthorByEmail(
      param.email,
      param.authorName,
    );

    if (author) {
      return { id: author.id, authorName: author.authorName }; // Corrected to return the actual authorName
    }

    author = await this.authorService.create(param);

    return author; // This will return the full author object created
  }
}
