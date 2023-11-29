import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Item } from '../../models/item';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  item: Item | undefined;
  collection = '';
  id = '';
  selectedSize: string | null = null;
  isAuthenticated = false;
  isLoaded = false;
  private userSub?: Subscription;
  showError = false;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
    this.collection = this.route.snapshot.params['category'];
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.databaseService.getItem(this.id).then((item) => {
      if (item) {
        this.item = item;
        this.isLoaded = true;
      } else {
        // prevent access to non-existing item page
        this.router.navigate(['/']);
      }
    });
  }

  onSelectSize(size: string) {
    this.selectedSize = size;
    this.showError = false;
  }

  onAddToCart() {
    if (this.item && this.selectedSize) {
      const cartItem: CartItem = {
        ...this.item,
        size: this.selectedSize,
        quantity: 1,
      };
      this.cartService.addToCart(cartItem);
    } else {
      this.showError = true;
    }
  }

  onAddToFavorites() {
    if (this.item) {
      this.favoritesService.addToFavorites(this.item.id);
    }
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
