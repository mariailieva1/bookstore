import { Injectable, PipeTransform } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageOptimizationPipe
  implements PipeTransform<Express.Multer.File[], Promise<Buffer>[]>
{
  transform(images: Express.Multer.File[]): Promise<Buffer>[] {
    return images.map((image) => {
      return sharp(image.buffer).resize(800).webp({ effort: 3 }).toBuffer();
    });
  }
}
