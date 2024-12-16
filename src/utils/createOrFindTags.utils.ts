import { TagsService } from '../tags/tags.service';

export class CreateOrFindTags {
  private tagsService = new TagsService();
  createOrFindTag = async (tagName: string) => {
    let tag = await this.tagsService.findTagsByName(tagName);
    if (!tag) {
      tag = await this.tagsService.CreateTag({ name: tagName });
    }
    return tag;
  };
}
