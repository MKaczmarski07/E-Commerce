import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { DatabaseService } from 'src/app/services/database.service';
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
  isRemovingPossible = false;
  isLoaded = false;
  skeletonItems: number[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.favItemsSub = this.favoritesService.favorites$.subscribe(() => {
      this.getItems();
    });
    this.initSkeletonItems();
  }

  getItems() {
    const favorites = this.favoritesService.getFavorites();
    this.databaseService.getItemsbyIDs(favorites).then((items) => {
      this.items = items;
      this.isLoaded = true;
      if (items.length === 0) {
        this.showInfo = true;
      }
    });
  }

  toggleRemoving() {
    this.isRemovingPossible = !this.isRemovingPossible;
  }

  initSkeletonItems() {
    this.skeletonItems = Array(8).fill(0);
  }

  ngOnDestroy() {
    this.favItemsSub?.unsubscribe();
  }
}
