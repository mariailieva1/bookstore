import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProduct } from '@common/interfaces/product.interface';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { IBreadcrumbItem } from '@common/interfaces/breadcrumb.interface';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { convertImagesToUrls } from 'src/app/helpers/image-to-url';
import { IImage } from '@common/interfaces/image.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule, BreadcrumbComponent, FormsModule],
  providers: [ProductsService, ReviewService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product?: IProduct;

  isInWishlist?: boolean;
  productId?: number;

  breadcrumb: IBreadcrumbItem[] = [];
  selectedImage?: IImage;

  comment: string = '';
  selectedRating = 0;
  isAuthenticated: boolean = false;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.productId = id;

      this.getProduct();
    });

    this.isAuthenticated = this.authService.isAuthenticated();
  }

  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
  }

  addToCart() {
    if (!this.product) return;

    this.cartService.addItemToCart(this.product);
  }

  private getProduct() {
    if (!this.productId) {
      console.error('Product Id is not defined!');
      return;
    }

    this.productsService.getProduct(this.productId).subscribe((product) => {
      if (!product) return;

      this.product = product;

      convertImagesToUrls(this.product.images);
      this.selectImage(this.product.images[0]);
      this.breadcrumb = [
        {
          name: product.category?.department.name ?? 'Home',
          link: [],
        },
        {
          name: product.category?.name ?? 'Category',
          link: ['/category', `${product.category?.id}`],
        },
        {
          name: product.name,
          link: [],
        },
      ];
    });
  }

  selectImage(img: IImage) {
    this.selectedImage = img;
  }

  submitReview() {
    if (!this.productId) return;
    this.reviewService
      .submitReview(this.productId, this.comment, this.selectedRating)
      .subscribe((review) => this.product?.reviews?.push(review));
  }
}
