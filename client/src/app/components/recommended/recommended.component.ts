import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductCardsComponent } from '../product-cards/product-cards.component';
import { CommonModule } from '@angular/common';
import { IProduct } from '@common/interfaces/product.interface';
import { convertImagesToUrls } from 'src/app/helpers/image-to-url';

@Component({
  selector: 'app-recommended',
  imports: [ProductCardsComponent, CommonModule],
  providers: [ProductsService],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.scss',
})
export class RecommendedComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getRecommended()?.subscribe((products) => {
      if (products) {
        this.products = products;
        this.products.forEach((product) => {
          convertImagesToUrls(product.images);
        });
      }
    });
  }
}
