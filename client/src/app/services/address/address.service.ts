import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '@common/interfaces/address.interface';
import { AuthService } from '../auth/auth.service';
import { IRequestStatusDto } from '@common/dtos/request-status.dto';

@Injectable()
export class AddressService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllAddresses() {
    if (!this.authService.isAuthenticated()) return;
    return this.http.get<IAddress[]>('/api/address');
  }

  getAllAddressesAdmin() {
    return this.http.get<IAddress[]>('/api/address/admin');
  }

  editAddress(address: IAddress) {
    if (!this.authService.isAuthenticated()) return;
    return this.http.put(`/api/address/${address.id}`, address);
  }

  deleteAddress(addressId: number) {
    if (!this.authService.isAuthenticated()) return;
    return this.http.delete(`/api/address/${addressId}`);
  }

  addAddress(address: IAddress) {
    const apiEndpoint = this.authService.isAuthenticated()
      ? '/api/address'
      : '/api/address/anonymous';
    return this.http.post<IAddress>(apiEndpoint, address);
  }

  updateEntityAsAdmin(address: any) {
    return this.http.put(`/api/address/admin/${address.id}`, address);
  }

  createEntityAsAdmin(entity: any) {
    return this.http.post(`/api/address/admin`, entity);
  }

  deleteEntityAsAdmin(entityId: number) {
    return this.http.delete(`/api/address/admin/${entityId}`);
  }
}
