import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadProductService } from 'src/app/services/load-product.service';
import { Item } from '../../models/item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  showInfo = false;
  private favItemsSub?: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private databaseService: DatabaseService,
    private loadProductService: LoadProductService
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.favItemsSub = this.favoritesService.favorites$.subscribe(() => {
      this.getItems();
    });
  }

  getItems() {
    const favorites = this.favoritesService.getFavorites();
    console.log(favorites);
    this.databaseService.getItemsbyIDs(favorites).then((items) => {
      this.items = items;
      if (items.length === 0) {
        this.showInfo = true;
      }
    });
  }

  onProductClick(item: Item) {
    this.loadProductService.loadProduct(item);
  }

  ngOnDestroy() {
    this.favItemsSub?.unsubscribe();
  }
}
