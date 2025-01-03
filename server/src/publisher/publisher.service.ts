import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  async findAll(): Promise<Publisher[]> {
    return this.publisherRepository.find();
  }

  async findOne(id: number): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { id },
      relations: ['products', 'products.images', 'products.category'],
    });
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  async create(publisherData: Partial<Publisher>): Promise<Publisher> {
    const publisher = this.publisherRepository.create(publisherData);
    return this.publisherRepository.save(publisher);
  }

  async update(
    id: number,
    publisherData: Partial<Publisher>,
  ): Promise<Publisher> {
    await this.findOne(id); // Ensure it exists
    await this.publisherRepository.update(id, publisherData);
    return this.publisherRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await this.publisherRepository.delete(id);
  }
}
