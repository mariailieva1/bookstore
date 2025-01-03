import {
  Controller,
  Param,
  Post,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ProductService } from 'src/product/product.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageOptimizationPipe } from './image-optimization.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/database/entities';

@Controller('api/images')
export class ImagesController {
  constructor(
    private imagesService: ImagesService,
    private productService: ProductService,
  ) {}

  @Post(':productId')
  @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(JwtAuthGuard)
  async uploadProductImages(
    @UploadedFiles(ImageOptimizationPipe) uploadedFiles: Promise<Buffer>[],
    @Param('productId') productId: number,
    @CurrentUser() user: User,
  ) {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    const files = await Promise.all(uploadedFiles);
    const images = await Promise.all(this.imagesService.uploadFiles(files));

    await this.productService.uploadFiles(productId, images);

    return { success: true };
  }
}
