import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { Department, Product } from '.';
import { ICategory } from '@interfaces/category.interface';

@Entity('categories')
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Department, (department) => department.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  department: Department;

  @Column()
  departmentId: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
