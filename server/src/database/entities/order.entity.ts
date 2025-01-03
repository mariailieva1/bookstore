import { IOrder } from '@common/interfaces/order.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Address } from './address.entity';

@Entity('orders')
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkoutSessionId: string;

  @ManyToOne(() => Address)
  @JoinTable()
  @JoinColumn()
  address: Address;

  @Column({ nullable: true })
  addressId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user?: User;

  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
