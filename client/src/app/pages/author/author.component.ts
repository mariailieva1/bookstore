import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IAuthor } from '@common/interfaces/author.interface';
import { IBreadcrumbItem } from '@common/interfaces/breadcrumb.interface';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { ProductCardsComponent } from 'src/app/components/product-cards/product-cards.component';
import { convertImagesToUrls } from 'src/app/helpers/image-to-url';
import { AuthorService } from 'src/app/services/author/author.service';

@Component({
  selector: 'app-author',
  imports: [
    CommonModule,
    RouterModule,
    ProductCardsComponent,
    BreadcrumbComponent,
  ],
  providers: [AuthorService],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
})
export class AuthorComponent implements OnInit {
  authorId?: number;
  author?: IAuthor;

  breadcrumb: IBreadcrumbItem[] = [];

  authorIdSub?: Subscription;
  authorSub?: Subscription;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authorId = params['id'];
      if (!this.authorId) return;

      this.authorSub?.unsubscribe();
      this.authorSub = this.authorService
        .getAuthor(this.authorId)
        .subscribe((author) => {
          if (!author) return;

          this.author = author;
          this.author.products?.forEach((prod) =>
            convertImagesToUrls(prod.images)
          );

          this.breadcrumb = [
            { name: 'Authors', link: ['/authors'] },
            { name: this.author.name },
          ];
        });
    });
  }
}
