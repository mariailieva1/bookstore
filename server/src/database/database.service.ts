import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  Author,
  Category,
  Department,
  Product,
  Publisher,
  Image,
  User,
  Address,
  Order,
  Tag,
} from './entities';
import { Review } from './entities/review.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const obj: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<number>('DATABASE_PORT'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [
        Department,
        Category,
        Product,
        Author,
        Publisher,
        Image,
        User,
        Address,
        Order,
        Tag,
        Review,
      ],
    };

    return obj;
  }
}
