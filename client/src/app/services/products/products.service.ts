import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { IProduct } from '@interfaces/product.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductsService {
  products: IProduct[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBestSellers() {
    return this.http.get<IProduct[] | null>('/api/products/best').pipe(
      catchError((err) => {
        console.error(err);

        return of(null);
      })
    );
  }

  getProduct(productId: number) {
    return this.http.get<IProduct>(`/api/products/${productId}`).pipe(
      catchError((err) => {
        console.error(err);

        return of(null);
      })
    );
  }

  getProducts() {
    return this.http.get<IProduct[]>(`/api/products`).pipe(
      catchError((err) => {
        console.error(err);

        return of(null);
      })
    );
  }

  getRecommended() {
    if (!this.authService.isAuthenticated()) return;
    return this.http.get<IProduct[]>(`/api/products/recommended`);
  }

  deleteEntityAsAdmin(entityId: number) {
    return this.http.delete(`/api/products/${entityId}`);
  }

  createEntityAsAdmin(entity: any) {
    return this.http.post(`/api/products`, entity);
  }

  updateEntityAsAdmin(entity: any) {
    return this.http.put(`/api/products/${entity.id}`, entity);
  }
}
