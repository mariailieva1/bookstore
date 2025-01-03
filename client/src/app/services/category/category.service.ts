import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '@common/interfaces/category.interface';
import { catchError, of } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory(categoryId: number) {
    return this.http.get<ICategory>(`/api/category/${categoryId}`).pipe(
      catchError((err) => {
        console.error(
          `Failed fetching category with Id ${categoryId}, Error: ${err}`
        );

        return of(null);
      })
    );
  }

  getCategories() {
    return this.http.get<ICategory[]>('/api/category');
  }

  deleteEntityAsAdmin(entityId: number) {
    return this.http.delete(`/api/category/${entityId}`);
  }

  createEntityAsAdmin(entity: any) {
    return this.http.post(`/api/category`, entity);
  }

  updateEntityAsAdmin(entity: any) {
    return this.http.put(`/api/category/${entity.id}`, entity);
  }
}
