import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DepartmentModule } from './department/department.module';
import { ProductModule } from './product/product.module';
import { ImagesModule } from './images/images.module';
import { SearchModule } from './search/search.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { TagsModule } from './tags/tags.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DepartmentModule,
    ProductModule,
    ImagesModule,
    SearchModule,
    CategoryModule,
    AuthorModule,
    PublisherModule,
    AuthModule,
    AddressModule,
    OrderModule,
    TagsModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
