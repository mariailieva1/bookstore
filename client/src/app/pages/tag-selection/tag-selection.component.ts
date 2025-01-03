import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ITag } from '@common/interfaces/tag.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-tag-selection',
  imports: [CommonModule, RouterModule],
  providers: [TagsService],
  templateUrl: './tag-selection.component.html',
  styleUrl: './tag-selection.component.scss',
})
export class TagSelectionComponent implements OnInit {
  tags: ITag[] = [];
  @Input({ alias: 'selectedTags', required: false }) selectedTags: number[] =
    [];
  @Input({ alias: 'isFullpage', required: true }) isFullpage: boolean = false;
  @Input({ alias: 'shouldRedirect', required: true }) shouldRedirect: boolean =
    false;

  constructor(
    private tagsService: TagsService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.tagsService.getTags().subscribe((tags) => (this.tags = tags));
  }

  toggleTag(tagId: number): void {
    if (this.selectedTags.includes(tagId)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tagId);
    } else {
      this.selectedTags.push(tagId);
    }
  }

  submitPreferences(): void {
    this.authService
      .saveTags(this.tags.filter((tag) => this.selectedTags.includes(tag.id)))
      .subscribe((result) => {
        if (!result) return;

        this.authService.updateUserPreferences(true);
        this.cartService.newItemAdded.next({
          message: 'Successfully saved preferences!',
          action: 'Ok!',
          time: 5000,
        });
        if (this.shouldRedirect) this.router.navigate(['/']);
      });
  }
}
