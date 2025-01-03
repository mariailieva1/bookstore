import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartment } from '@common/interfaces/department.interface';
import { catchError, of } from 'rxjs';

@Injectable()
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<IDepartment[]>('/api/departments').pipe(
      catchError((err) => {
        console.error(err);

        return of(null);
      })
    );
  }

  getDepartmentsAdmin() {
    return this.http.get<IDepartment[]>('/api/departments/admin').pipe(
      catchError((err) => {
        console.error(err);

        return of(null);
      })
    );
  }

  updateEntityAsAdmin(entity: any) {
    return this.http.put(`/api/departments/${entity.id}`, entity);
  }

  createEntityAsAdmin(entity: any) {
    return this.http.post(`/api/departments`, entity);
  }

  deleteEntityAsAdmin(entityId: number) {
    return this.http.delete(`/api/departments/${entityId}`);
  }
}
