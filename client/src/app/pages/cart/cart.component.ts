import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAddress } from '@common/interfaces/address.interface';
import { ICartItem } from '@interfaces/card-item.interface';
import { catchError, of, Subscription, take } from 'rxjs';
import { AddressComponent } from 'src/app/components/address/address.component';
import { AddressService } from 'src/app/services/address/address.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, AddressComponent],
  providers: [AddressService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ICartItem[] = [];

  addresses: IAddress[] = [];
  selectedAddressId?: number;
  subs: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.subs = [
      this.cartService.cart.subscribe((cart) => (this.cartItems = cart)),
    ];
    const obs = this.addressService.getAllAddresses();
    if (obs)
      this.subs.push(
        obs.subscribe((addresses) => (this.addresses = addresses))
      );
  }

  // Calculate the total price
  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Update the cart (e.g., when quantity changes)
  updateCart(): void {
    this.cartService.updateStorage(this.cartItems);
  }

  // Remove an item from the cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.cartService.updateStorage(this.cartItems);
  }

  // Proceed to checkout
  proceedToCheckout(): void {
    if (!this.selectedAddressId) {
      this.cartService.newItemAdded.next({
        message: 'Select a delivery address first',
        action: 'Ok!',
        time: 5000,
      });
      return;
    }

    if (this.cartItems.length === 0) {
      this.cartService.newItemAdded.next({
        message: `There's nothing in the cart`,
        action: 'Ok!',
        time: 5000,
      });
      return;
    }

    const selectedAddress = this.addresses.find(
      (address) => address.id === this.selectedAddressId
    );

    this.cartService.checkout(selectedAddress!).subscribe(({ url }) => {
      this.cartService.updateStorage([]);
      window.location.replace(url);
    });
  }

  onSubmitAddress(addressData: IAddress): void {
    this.addressService
      .addAddress(addressData)
      .pipe(
        take(1),
        catchError((err) => {
          console.error(`Failed adding new address, Error: ${err}`);

          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) this.addresses.push(result);
        else
          this.cartService.newItemAdded.next({
            message: 'Oops! Something went wrong.',
            action: 'Ok!',
            time: 5000,
          });
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
