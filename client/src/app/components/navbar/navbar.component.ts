import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription, take } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';
import {
  ICategorySearchResult,
  IProductSearchResult,
  SearchResult,
} from '@interfaces/search-result.interface';
import { Router, RouterModule } from '@angular/router';
import { convertImagesToUrls } from 'src/app/helpers/image-to-url';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [SearchService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;

  searchControl: FormControl<string | null> = new FormControl<string | null>(
    null
  );
  searchResults: any[] = [];
  searchChangeSub?: Subscription;
  searchKeyword: string | null = null;
  keyboardFocusIndex: number = 0;
  isSearchFocused: boolean = false;
  preventBlurEvent: boolean = false;

  itemsInCart: number = 0;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.searchChangeSub = this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.searchChanged.bind(this));

    this.cartService.cart.subscribe((cart) => (this.itemsInCart = cart.length));
  }

  ngOnDestroy(): void {
    this.searchChangeSub?.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSelect(resource: SearchResult) {
    this.router.navigate([resource.type, resource.id]);

    this.searchResults = [];
    this.keyboardFocusIndex = 0;
    this.searchControl.reset();
  }

  private searchChanged(searchKeyword: string | null) {
    this.searchKeyword = searchKeyword?.trim() ?? null;
    if (!this.searchKeyword) {
      this.searchResults = [];
      return;
    }

    this.searchService
      .search(this.searchKeyword)
      .pipe(take(1))
      .subscribe((searchResult) => {
        this.keyboardFocusIndex = 0;
        this.searchResults =
          searchResult
            ?.map(this.modifySearchData.bind(this))
            .sort(this.sortByExactMatch) ?? [];
      });
  }

  private isProduct(resource: SearchResult): resource is IProductSearchResult {
    return resource.type === 'product';
  }

  private modifySearchData(res: SearchResult): SearchResult {
    if (this.isProduct(res)) {
      convertImagesToUrls(res.images);
    }

    if (res.name.toLowerCase() === this.searchKeyword?.toLowerCase())
      res.exactMatch = true;

    return res;
  }

  private sortByExactMatch(a: SearchResult, b: SearchResult): -1 | 0 | 1 {
    // If a.exactMatch is true and b.exactMatch is undefined, a comes first
    if (a.exactMatch === true && b.exactMatch === undefined) {
      return -1;
    }
    // If b.exactMatch is true and a.exactMatch is undefined, b comes first
    if (b.exactMatch === true && a.exactMatch === undefined) {
      return 1;
    }
    // Otherwise, maintain order
    return 0;
  }

  handleNavigation(ev: KeyboardEvent) {
    if (ev.code !== 'ArrowUp' && ev.code !== 'ArrowDown' && ev.code !== 'Enter')
      return;
    ev.preventDefault();

    if (ev.code === 'ArrowUp') {
      if (this.keyboardFocusIndex <= 0) return;
      this.keyboardFocusIndex -= 1;
    } else if (ev.code === 'ArrowDown') {
      if (this.keyboardFocusIndex >= this.searchResults.length - 1) return;
      this.keyboardFocusIndex += 1;
    } else if (ev.code === 'Enter') {
      const resource = this.searchResults[this.keyboardFocusIndex];
      if (resource) this.onSelect(resource);
    }
  }

  onBlurSearchInput() {
    if (this.preventBlurEvent) return;
    this.isSearchFocused = false;
  }
}
