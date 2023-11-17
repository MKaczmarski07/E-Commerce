import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../models/item';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private cartItemsSub?: Subscription;
  subTotal: number = 0;
  shipping: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateValues();
    this.cartItemsSub = this.cartService.cartItemsCount$.subscribe(() => {
      this.cartItems = this.cartService.getCartItems();
      this.calculateValues();
    });
  }

  calculateValues() {
    this.subTotal = this.cartItems.reduce(
      (acc, item) =>
        item.discountPrice
          ? acc + item.discountPrice * item.quantity
          : acc + item.price * item.quantity,
      0
    );
    this.shipping = this.subTotal > 100 ? 0 : 10;
    this.total = this.subTotal + this.shipping;
  }

  onCheckout() {
    if (this.cartItems.length > 0) {
      this.cartService.checkout();
    }
  }

  ngOnDestroy() {
    this.cartItemsSub?.unsubscribe();
  }
}
