import { Injectable } from '@nestjs/common';
import { Image } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  uploadFiles(files: Buffer[]): Promise<Image>[] {
    return files.map(async (file) => {
      const image = new Image();
      image.fullSize = file as any;
      // image.order = i;
      return await this.imagesRepository.save(image);
    });
  }
}
