import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IReview } from '@common/interfaces/review.interface';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/database/entities';

@Controller('api/review')
export class ReviewController {
  constructor(private reviewSerivice: ReviewService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  addReview(
    @CurrentUser() user: User,
    @Body('productId') productId: number,
    @Body('comment') comment: string,
    @Body('rating') rating: number,
  ) {
    return this.reviewSerivice.addReview(user.id, productId, comment, rating);
  }
}
