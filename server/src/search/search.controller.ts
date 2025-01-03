import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  searchProducts(@Query('keyword') searchKeyword: string) {
    return this.searchService.search(searchKeyword);
  }
}
