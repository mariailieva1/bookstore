import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IBreadcrumbItem } from '@common/interfaces/breadcrumb.interface';
import { ICategory } from '@common/interfaces/category.interface';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { ProductCardsComponent } from 'src/app/components/product-cards/product-cards.component';
import { convertImagesToUrls } from 'src/app/helpers/image-to-url';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category',
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    ProductCardsComponent,
  ],
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryId?: number;
  category?: ICategory;

  breadcrumb: IBreadcrumbItem[] = [];

  getCategorySub?: Subscription;
  routeParamsSub?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe((params) => {
      this.categoryId = params['id'];

      if (!this.categoryId) return;

      this.getCategorySub?.unsubscribe();
      this.getCategorySub = this.categoryService
        .getCategory(this.categoryId)
        .subscribe((category) => {
          if (!category) return;
          this.category = category;

          category.products?.forEach((product) =>
            convertImagesToUrls(product.images || [])
          );

          this.breadcrumb = [
            {
              name: this.category.department.name,
              link: ['/'],
              queryParams: { dep: this.category.department.id },
            },
            { name: this.category.name },
          ];
        });
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub?.unsubscribe();
    this.getCategorySub?.unsubscribe();
  }
}
