import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ICartItem } from '@common/interfaces/card-item.interface';
import { IAddress } from '@common/interfaces/address.interface';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/database/entities';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPayment(
    @CurrentUser() user: User,
    @Body('items') items: ICartItem[],
    @Body('address') address: IAddress,
  ) {
    const url = await this.orderService.createPayment(items, address, user.id);
    return { url };
  }

  @Post('anonymous')
  async createPaymentAnonymous(
    @Body('items') items: ICartItem[],
    @Body('address') address: IAddress,
  ) {
    const url = await this.orderService.createPayment(items, address);
    return { url };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@CurrentUser() user: User) {
    return this.orderService.getUserOrders(user.id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllOrders(@CurrentUser() user: User) {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.orderService.getAllOrders();
  }
}
