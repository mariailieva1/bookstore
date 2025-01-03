import { Injectable, NotFoundException } from '@nestjs/common';
import { Address } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  async findAllForUser(userId: number): Promise<Address[]> {
    return this.addressRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(id: number, userId?: number): Promise<Address> {
    const where = userId ? { id, user: { id: userId } } : { id };
    const address = await this.addressRepository.findOne({
      where,
      relations: ['user'],
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async create(addressData: Partial<Address>): Promise<Address> {
    const address = this.addressRepository.create(addressData);
    return this.addressRepository.save(address);
  }

  async update(
    id: number,
    userId: number,
    addressData: Partial<Address>,
  ): Promise<Address> {
    await this.findOne(id, userId); // Ensure it exists
    await this.addressRepository.update(id, addressData);
    return this.addressRepository.findOneBy({ id });
  }

  async updateAdmin(id: number, addressData: Partial<Address>) {
    await this.findOne(id);
    return await this.addressRepository.update(id, addressData);
  }

  async remove(id: number, userId?: number): Promise<void> {
    const address = await this.findOne(id, userId); // Ensure it exists

    address.user = null;
    await this.addressRepository.save(address);
  }
}
