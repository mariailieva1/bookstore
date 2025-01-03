import { IPublisher } from '@interfaces/publisher.interface';
import { IProduct } from '@interfaces/product.interface';
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

@Entity('publishers')
export class Publisher implements IPublisher {
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
