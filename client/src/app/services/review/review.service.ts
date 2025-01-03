import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReview } from '@common/interfaces/review.interface';

@Injectable()
export class ReviewService {
  constructor(private http: HttpClient) {}

  submitReview(productId: number, comment: string, rating: number) {
    return this.http.post<IReview>(`/api/review`, {
      productId,
      comment,
      rating,
    });
  }
}
