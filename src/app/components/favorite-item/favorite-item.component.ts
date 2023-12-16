import { Component, Input } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LoadProductService } from 'src/app/services/load-product.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent {
  @Input() item: Item = {} as Item;
  @Input() isDeleteButtonVisible = false;

  constructor(
    private favoritesService: FavoritesService,
    private loadProductService: LoadProductService
  ) {}

  onItemRemove() {
    if (!this.item) return;
    this.favoritesService.deleteItem(this.item.id);
  }

  onProductClick(item: Item) {
    if (this.isDeleteButtonVisible) return;
    this.loadProductService.loadProduct(item);
  }
}
