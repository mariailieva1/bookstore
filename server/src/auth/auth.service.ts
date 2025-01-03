import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Address, Order, Tag } from '../database/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return this.signJWT(newUser);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['addresses', 'orders', 'tags'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    delete user.password;
    return user;
  }

  async addUserAddress(address: Address, userId: number): Promise<User> {
    const user = await this.findOne(userId);
    user.addresses = [...user.addresses, address];
    return this.userRepository.save(user);
  }

  async addUserOrder(order: Order, userId: number): Promise<User> {
    const user = await this.findOne(userId);
    user.orders = [...user.orders, order];
    return this.userRepository.save(user);
  }

  async updateUserTags(tags: Tag[], userId: number): Promise<User> {
    const user = await this.findOne(userId);
    user.tags = tags;
    return this.userRepository.save(user);
  }

  signJWT(user: User): string {
    return this.jwtService.sign({ ...user });
  }

  async getAllUsers() {
    const users = await this.userRepository.find({});
    return users.map((user) => ({ ...user, password: null }));
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.findOne(id); // Ensure it exists
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await this.userRepository.delete(id);
  }
}
