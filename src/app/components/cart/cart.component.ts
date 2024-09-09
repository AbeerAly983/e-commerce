import { Component, inject, OnInit } from '@angular/core';
import { CardService } from '../../core/services/card.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CardService = inject(CardService);
  cartProduct: ICart = {} as ICart;
  ngOnInit(): void {
    this._CardService.getProductCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartProduct = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteItem(id: string) {
    this._CardService.removeItemFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartProduct = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateCount(id: string, count: number): void {
    this._CardService.updateQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartProduct = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteAllCart() {
    this._CardService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartProduct = {} as ICart;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
