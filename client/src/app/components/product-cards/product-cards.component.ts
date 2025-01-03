import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '@common/interfaces/product.interface';

@Component({
  selector: 'app-product-cards',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.scss',
})
export class ProductCardsComponent {
  @Input({ alias: 'products', required: true }) products: IProduct[] = [];
}
