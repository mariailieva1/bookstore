import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from '@interfaces/user.interface';
import { AddressService } from 'src/app/services/address/address.service';
import { IAddress } from '@common/interfaces/address.interface';
import { AddressComponent } from 'src/app/components/address/address.component';
import { lastValueFrom } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { IOrder } from '@common/interfaces/order.interface';
import { TagSelectionComponent } from '../tag-selection/tag-selection.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, AddressComponent, TagSelectionComponent],
  providers: [AddressService, OrderService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user?: IUser;
  addresses: IAddress[] = [];
  selectedAddressId?: number;
  orders?: (IOrder & { lineItems: any; checkoutDetails: any })[];
  selectedTags: number[] = [];

  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.authService.getMe().subscribe((user) => {
      if (user) {
        this.user = user;
        this.selectedTags = user.tags?.map((tag) => tag.id) ?? [];
      }
    });

    this.addressService.getAllAddresses()?.subscribe((addresses) => {
      this.addresses = addresses;
    });

    this.orderService
      .getUserOrders()
      .subscribe((orders) => (this.orders = orders));
  }

  async editAddress(address: IAddress) {
    if (!this.selectedAddressId) return;
    const editedAddress = {
      ...address,
      id: this.selectedAddressId,
    };

    const result = this.addressService.editAddress(editedAddress);
    if (result) await lastValueFrom(result);

    const index = this.addresses.findIndex(
      (address) => address.id === this.selectedAddressId
    );

    this.addresses[index] = editedAddress;
    this.addresses = [...this.addresses];
  }

  async deleteAddress(id: number) {
    const result = this.addressService.deleteAddress(id);
    if (result) await lastValueFrom(result);

    this.addresses = this.addresses.filter((address) => address.id !== id);
  }
}
