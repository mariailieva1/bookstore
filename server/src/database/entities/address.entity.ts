import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAddress } from '@interfaces/address.interface';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity('addresses')
export class Address implements IAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  addressLine: string;

  @Column({ nullable: true })
  additionalAddressLine?: string;

  @Column()
  postCode: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
