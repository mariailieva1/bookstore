import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IAddress } from '@common/interfaces/address.interface';
import { ICartItem } from '@common/interfaces/card-item.interface';
import { IProduct } from '@common/interfaces/product.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: ICartItem[] = [];
  cart = new BehaviorSubject<ICartItem[]>(this._cart);

  newItemAdded = new Subject<{
    message: string;
    action: string;
    time: number;
  }>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this._cart = JSON.parse(localStorage?.getItem('cart') || '[]');
      this.cart.next(this._cart);
    }
  }

  addItemToCart(product: IProduct) {
    const itemInCart = this._cart.find((item) => item.id === product.id);
    if (itemInCart) itemInCart.quantity += 1;
    else this._cart.push({ ...product, quantity: 1 });
   
    this.updateStorage();
    this.cart.next(this._cart);
    this.newItemAdded.next({
      message: 'Added to cart!',
      action: 'Ok!',
      time: 5000,
    });
  }

  updateStorage(newCart?: ICartItem[]) {
    if (newCart) {
      this._cart = newCart;
      this.cart.next(this._cart);
    }
    localStorage.setItem('cart', JSON.stringify(this._cart));
  }

  checkout(address: IAddress) {
    const apiEndpoint = this.authService.isAuthenticated()
      ? '/api/order'
      : '/api/order/anonymous';
    return this.http.post<{ url: string }>(apiEndpoint, {
      items: this._cart,
      address,
    });
  }
}
