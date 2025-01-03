import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICartItem } from '@interfaces/card-item.interface';

import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities';
import { Repository } from 'typeorm';
import { IAddress } from '@common/interfaces/address.interface';
import { IUser } from '@common/interfaces/user.interface';
import { AddressService } from 'src/address/address.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OrderService {
  private stripe;

  private domainName: string;
  constructor(
    configService: ConfigService,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private addressService: AddressService,
    private authService: AuthService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_API_SECRET'), {
      apiVersion: '2024-12-18.acacia',
    });
    this.domainName = configService.get('APP_DOMAIN');
  }

  async createPayment(items: ICartItem[], address: IAddress, userId?: number) {
    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price * 100),
        },
        quantity: item.quantity,
      };
    });
    const session = await this.stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${this.domainName}/success`,
      cancel_url: `${this.domainName}/cancel`,
    });

    const order = this.orderRepository.create({
      address: await this.addressService.findOne(address.id, userId),
      checkoutSessionId: session.id,
    });
    await this.orderRepository.save(order);
    if (userId) await this.authService.addUserOrder(order, userId);

    return session.url;
  }

  async getUserOrders(id: number) {
    const orders: any = await this.orderRepository.find({
      where: { user: { id } },
      relations: ['user', 'address'],
    });

    return await this.fetchStripeData(orders);
  }

  async getAllOrders() {
    const orders: any = await this.orderRepository.find({
      relations: ['user', 'address'],
    });

    return await this.fetchStripeData(orders);
  }

  async fetchStripeData(orders) {
    return Promise.all(
      orders.map(async (order) => {
        const lineItems = await this.stripe.checkout.sessions.listLineItems(
          order.checkoutSessionId,
        );
        const checkoutDetails = await this.stripe.checkout.sessions.retrieve(
          order.checkoutSessionId,
        );

        return { ...order, lineItems, checkoutDetails };
      }),
    );
    // for (let order of orders) {
    //   const lineItems = await this.stripe.checkout.sessions.listLineItems(
    //     order.checkoutSessionId,
    //   );
    //   order.lineItems = lineItems;
    //   order.checkoutDetails = await this.stripe.checkout.sessions.retrieve(
    //     order.checkoutSessionId,
    //   );
    // }
  }
}
