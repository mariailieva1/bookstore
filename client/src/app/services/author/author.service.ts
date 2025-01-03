import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthor } from '@common/interfaces/author.interface';
import { catchError, of } from 'rxjs';

@Injectable()
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAuthor(authorId: number) {
    return this.http.get<IAuthor>(`/api/author/${authorId}`).pipe(
      catchError((err) => {
        console.error(
          `Failed fetching Author with ID ${authorId}, Error: ${err}`
        );

        return of(null);
      })
    );
  }

  getAuthors() {
    return this.http.get<IAuthor[]>(`/api/author`).pipe(
      catchError((err) => {
        console.error(`Failed fetching Authors, Error: ${err}`);

        return of(null);
      })
    );
  }

  deleteEntityAsAdmin(entityId: number) {
    return this.http.delete(`/api/author/${entityId}`);
  }

  createEntityAsAdmin(entity: any) {
    return this.http.post(`/api/author`, entity);
  }

  updateEntityAsAdmin(entity: any) {
    return this.http.put(`/api/author/${entity.id}`, entity);
  }
}
