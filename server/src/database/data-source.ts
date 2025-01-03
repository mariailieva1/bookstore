import { DataSource } from 'typeorm';
import {
  Author,
  Publisher,
  Product,
  Category,
  Department,
  Image,
  User,
  Address,
  Order,
  Tag,
} from './entities';
import { config } from 'dotenv';
import { Review } from './entities/review.entity';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env['DATABASE_HOST'],
  port: parseInt(process.env['DATABASE_PORT']),
  username: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
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
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
