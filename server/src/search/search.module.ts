import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author, Category, Product, Publisher } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Author, Publisher])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
