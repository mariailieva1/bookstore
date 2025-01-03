import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-snackbar',
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  message: string = '';
  actionText: string | null = null;
  // @Output() action = new EventEmitter<void>();

  isVisible = false;

  constructor(private cartService: CartService) {
    this.cartService.newItemAdded.subscribe(({ message, action, time }) =>
      this.showSnackbar(message, action, time)
    );
  }

  showSnackbar(message: string, actionText: string, time: number): void {
    this.message = message;
    this.actionText = actionText;
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, time);
  }

  onActionClick(): void {
    this.isVisible = false;
  }
}
