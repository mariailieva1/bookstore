import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Review } from 'src/database/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private authService: AuthService,
  ) {}

  async addReview(
    userId: number,
    productId: number,
    comment: string,
    rating: number,
  ) {
    const user = await this.authService.findOne(userId);
    const reviewData = {
      user,
      productId,
      comment,
      rating,
    };
    const review = this.reviewRepository.create(reviewData);
    return this.reviewRepository.save(review);
  }
}
