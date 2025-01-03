import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, Order } from 'src/database/entities';
import { AuthModule } from 'src/auth/auth.module';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Order, Address]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, AddressService],
})
export class OrderModule {}
