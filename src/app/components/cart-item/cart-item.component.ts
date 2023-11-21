import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() shortDes = '';
  @Input() price = 0;
  @Input() size = '';
  @Input() imageUrl = '';
  @Input() quantity = 0;
  @Input() discountPrice: number | undefined = undefined;
  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  onItemDelete() {
    this.cartService.removeFromCart(this.id, this.size);
  }

  onAddToFavorites() {
    this.favoritesService.addToFavorites(this.id);
  }
}
