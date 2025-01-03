import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IBreadcrumbItem } from '@interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input({ alias: 'items', required: true }) set itemsSetter(
    items: IBreadcrumbItem[]
  ) {
    this.item = items.pop();
    this.items = items;
  }

  items: IBreadcrumbItem[] = [];
  item?: IBreadcrumbItem;
}
