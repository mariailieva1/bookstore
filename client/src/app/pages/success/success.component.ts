import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-success',
  imports: [RouterModule],
  providers: [CartService],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    localStorage.setItem('cart', '[]');
    this.cartService.cart.next([]);
  }
}
