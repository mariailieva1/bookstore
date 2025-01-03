import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../database/entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      relations: [
        'categories',
        'categories.products',
        'categories.products.images',
      ],
    });
  }

  findAllAdmin(): Promise<Department[]> {
    return this.departmentRepository.find({});
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({ id });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async create(departmentData: Partial<Department>): Promise<Department> {
    const department = this.departmentRepository.create(departmentData);
    return this.departmentRepository.save(department);
  }

  async update(
    id: number,
    departmentData: Partial<Department>,
  ): Promise<Department> {
    await this.findOne(id); // Ensure it exists
    await this.departmentRepository.update(id, departmentData);
    return this.departmentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await this.departmentRepository.delete(id);
  }
}
