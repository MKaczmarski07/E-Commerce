import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-added',
  templateUrl: './product-added.component.html',
  styleUrls: ['./product-added.component.scss'],
})
export class ProductAddedComponent implements OnInit, OnDestroy {
  private isAddInfoVisibleSub?: Subscription;
  private addedItemSub?: Subscription;
  private userSub?: Subscription;
  addedItem?: CartItem;
  isAuthenticated = false;
  isAddInfoVisible = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addedItemSub = this.cartService.lastAddedItem$.subscribe(
      (item) => (this.addedItem = item)
    );
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
      }
    });
    this.isAddInfoVisibleSub = this.cartService.isAddInfoVisible$.subscribe(
      (isVisible) => (this.isAddInfoVisible = isVisible)
    );
  }

  onCheckoutSelected() {
    this.onAddInfoClose();
    if (this.isAuthenticated) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/checkout-auth']);
    }
  }

  onAddInfoClose() {
    this.cartService.closeAddInfo();
  }

  ngOnDestroy() {
    this.addedItemSub?.unsubscribe();
    this.userSub?.unsubscribe();
    this.isAddInfoVisibleSub?.unsubscribe();
  }
}
