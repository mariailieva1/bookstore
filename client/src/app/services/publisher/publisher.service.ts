import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPublisher } from '@common/interfaces/publisher.interface';
import { catchError, of } from 'rxjs';

@Injectable()
export class PublisherService {
  constructor(private http: HttpClient) {}

  getPublisher(publisherId: number) {
    return this.http.get<IPublisher>(`/api/publisher/${publisherId}`).pipe(
      catchError((err) => {
        console.error(
          `Failed fetching Publisher with ID ${publisherId}, Error: ${err}`
        );

        return of(null);
      })
    );
  }

  getPublishers() {
    return this.http.get<IPublisher[]>(`/api/publisher`).pipe(
      catchError((err) => {
        console.error(`Failed fetching Publishers, Error: ${err}`);

        return of(null);
      })
    );
  }

  deleteEntityAsAdmin(entityId: number) {
    return this.http.delete(`/api/publisher/${entityId}`);
  }

  createEntityAsAdmin(entity: any) {
    return this.http.post(`/api/publisher`, entity);
  }

  updateEntityAsAdmin(entity: any) {
    return this.http.put(`/api/publisher/${entity.id}`, entity);
  }
}
