import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['products', 'products.images', 'products.category'],
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async create(authorData: Partial<Author>): Promise<Author> {
    const author = this.authorRepository.create(authorData);
    return this.authorRepository.save(author);
  }

  async update(id: number, authorData: Partial<Author>): Promise<Author> {
    await this.findOne(id); // Ensure it exists
    await this.authorRepository.update(id, authorData);
    return this.authorRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await this.authorRepository.delete(id);
  }
}
