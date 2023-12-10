import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateValues();
    this.cartItemsSub = this.cartService.cartItemsCount$.subscribe(() => {
      this.cartItems = this.cartService.getCartItems();
      this.calculateValues();
    });
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
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
    if (this.cartItems.length === 0) {
      return;
    }
    this.cartService.saveTotalPrice(this.total);
    if (this.isAuthenticated) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/checkout-auth']);
    }
  }

  ngOnDestroy() {
    this.cartItemsSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}
