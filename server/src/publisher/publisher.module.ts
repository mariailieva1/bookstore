import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublisherService],
  controllers: [PublisherController],
})
export class PublisherModule {}
