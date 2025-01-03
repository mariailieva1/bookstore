import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('api/tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags() {
    return this.tagsService.findTags();
  }
}
