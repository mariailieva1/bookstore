import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IProduct } from '@interfaces/product.interface';
import { Publisher, Author, Category, Image, Tag } from '.';
import { Review } from './review.entity';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column({ nullable: true })
  @Index()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  originalPrice?: number;

  @Column({ default: 0 })
  stock_quantity: number;

  @ManyToOne(() => Author, (author) => author.products)
  @JoinColumn()
  author: Author;

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.products)
  @JoinColumn()
  publisher: Publisher;

  @Column()
  publisherId: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @Column()
  categoryId: number;

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
