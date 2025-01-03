import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable()
export class ImagesService {
  constructor(private http: HttpClient) {}

  uploadImages(productId: number, files: File[]) {
    const formData = new FormData();

    files.forEach((file) => formData.append(file.name, file));

    return this.http
      .post<{ success: boolean } | null>(`/api/images/${productId}`, formData)
      .pipe(
        catchError((err) => {
          console.error(err);

          return of(null);
        })
      );
  }
}
