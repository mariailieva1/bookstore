import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, Category, Author, Publisher } from '../database/entities';
import { Like, Repository } from 'typeorm';
import {
  SearchResult,
  SearchResultTypes,
} from '@interfaces/search-result.interface';

@Injectable()
export class SearchService {
  private searchQuery: string;
  private searchKeyword: string;
  private limit: number = 5;

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  async search(searchKeyword: string): Promise<SearchResult[]> {
    this.searchKeyword = this.searchKeyword;
    this.searchQuery = `%${searchKeyword}%`;

    const [products, categories, authors, publishers] = await Promise.all([
      this.searchProducts(),
      this.searchCategories(),
      this.searchAuthors(),
      this.searchPublishers(),
    ]);

    return [
      ...this.addSearchType(products, 'product'),
      ...this.addSearchType(categories, 'category'),
      ...this.addSearchType(authors, 'author'),
      ...this.addSearchType(publishers, 'publisher'),
    ] as SearchResult[];
  }

  private async searchProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: [
        { name: Like(this.searchQuery) },
        { description: Like(this.searchQuery) },
      ],
      relations: ['images'],
      take: this.limit,
    });

    // products.forEach((product) => {
    //   product.images = convertImageToBase64(product.images);
    // });

    return products;
  }

  private searchCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { name: Like(this.searchQuery) },
      take: this.limit,
    });
  }

  private searchAuthors(): Promise<Author[]> {
    return this.authorRepository.find({
      where: [{ name: Like(this.searchQuery) }],
      take: this.limit,
    });
  }

  private searchPublishers(): Promise<Publisher[]> {
    return this.publisherRepository.find({
      where: { name: Like(this.searchQuery) },
      take: this.limit,
    });
  }

  private addSearchType(
    result: (Product | Category | Author | Publisher)[],
    type: SearchResultTypes,
  ): SearchResult[] {
    return result.map((x) => ({ ...x, type })) as unknown as SearchResult[];
  }
}
