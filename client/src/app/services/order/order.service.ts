import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '@common/interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getUserOrders() {
    return this.http.get<(IOrder & { lineItems: any; checkoutDetails: any })[]>(
      '/api/order'
    );
  }

  getAllUserOrders() {
    return this.http.get<(IOrder & { lineItems: any; checkoutDetails: any })[]>(
      '/api/order/all'
    );
  }
}
