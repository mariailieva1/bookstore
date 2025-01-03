import { IAuthor } from '@interfaces/author.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '.';
import { IProduct } from '@interfaces/product.interface';

@Entity('authors')
export class Author implements IAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @OneToMany(() => Product, (product) => product.author)
  products: IProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
