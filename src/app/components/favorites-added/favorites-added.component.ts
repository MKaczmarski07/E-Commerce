import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites-added',
  templateUrl: './favorites-added.component.html',
  styleUrls: ['./favorites-added.component.scss'],
})
export class FavoritesAddedComponent implements OnInit, OnDestroy {
  private isAddInfoVisibleSub?: Subscription;
  private addedItemSub?: Subscription;
  addedItem?: Item;
  isAddInfoVisible = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.addedItemSub = this.favoritesService.lastAddedItem$.subscribe(
      (item) => (this.addedItem = item)
    );
    this.isAddInfoVisibleSub =
      this.favoritesService.isAddInfoVisible$.subscribe(
        (isVisible) => (this.isAddInfoVisible = isVisible)
      );
  }

  onAddInfoClose() {
    this.favoritesService.closeAddInfo();
  }

  ngOnDestroy() {
    this.addedItemSub?.unsubscribe();
    this.isAddInfoVisibleSub?.unsubscribe();
  }
}
