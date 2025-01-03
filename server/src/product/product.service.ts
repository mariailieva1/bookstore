import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, User } from 'src/database/entities';
import { Any, ArrayContains, Repository } from 'typeorm';
import { Image } from '../database/entities';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private authService: AuthService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findRecommended(userId: number) {
    const user = await this.authService.findOne(userId);
    const tags = user.tags.map((tag) => tag.id);

    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tag')
      .where('tag.id IN (:...tagIds)', { tagIds: tags })
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('category.department', 'department')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.author', 'author')
      .leftJoinAndSelect('product.publisher', 'publisher')
      .take(4)
      .getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: [
        'category',
        'category.department',
        'images',
        'author',
        'publisher',
        'reviews',
        'reviews.user',
      ],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(departmentData: Partial<Product>): Promise<Product> {
    const department = this.productRepository.create(departmentData);
    return this.productRepository.save(department);
  }

  async update(id: number, departmentData: Partial<Product>): Promise<Product> {
    await this.findOne(id); // Ensure it exists
    await this.productRepository.update(id, departmentData);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await this.productRepository.delete(id);
  }

  async uploadFiles(id: number, images: Image[]) {
    const product = await this.findOne(id);
    product.images = [...product.images, ...images];
    await this.productRepository.save(product);
  }
}
