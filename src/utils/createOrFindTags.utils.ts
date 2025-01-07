import { TagsService } from '../tags/tags.service';

const tagsService = new TagsService();

const createOrFindTag = async (tagName: string) => {
  let tag = await tagsService.findTagsByName(tagName);
  if (!tag) {
    tag = await tagsService.CreateTag({ name: tagName });
  }
  return { id: tag.id };
};

export default createOrFindTag;
