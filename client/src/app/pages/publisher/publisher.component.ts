import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IBreadcrumbItem } from '@common/interfaces/breadcrumb.interface';
import { IPublisher } from '@common/interfaces/publisher.interface';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { ProductCardsComponent } from 'src/app/components/product-cards/product-cards.component';
import { convertImagesToUrls } from 'src/app/helpers/image-to-url';
import { PublisherService } from 'src/app/services/publisher/publisher.service';

@Component({
  selector: 'app-publisher',
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    ProductCardsComponent,
  ],
  providers: [PublisherService],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.scss',
})
export class PublisherComponent {
  publisherId?: number;
  publisher?: IPublisher;

  breadcrumb: IBreadcrumbItem[] = [];

  publisherIdSub?: Subscription;
  publisherSub?: Subscription;

  constructor(
    private publisherService: PublisherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.publisherId = params['id'];
      if (!this.publisherId) return;

      this.publisherSub?.unsubscribe();
      this.publisherSub = this.publisherService
        .getPublisher(this.publisherId)
        .subscribe((publisher) => {
          if (!publisher) return;

          this.publisher = publisher;
          this.publisher.products?.forEach((prod) =>
            convertImagesToUrls(prod.images)
          );

          this.breadcrumb = [
            { name: 'Publishers', link: ['/publishers'] },
            { name: this.publisher.name },
          ];
        });
    });
  }
}
