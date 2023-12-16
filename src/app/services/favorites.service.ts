import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites = new Subject<number>();
  favorites$ = this.favorites.asObservable();
  private lastAddedItem = new Subject<Item>();
  lastAddedItem$ = this.lastAddedItem.asObservable();
  private timer: any;
  private isAddInfoVisible = new Subject<boolean>();
  isAddInfoVisible$ = this.isAddInfoVisible.asObservable();

  constructor(private databaseService: DatabaseService) {}

  private toggleAddInfo() {
    this.isAddInfoVisible.next(true);
    this.timer = setTimeout(() => {
      this.isAddInfoVisible.next(false);
    }, 3000);
  }

  closeAddInfo() {
    this.isAddInfoVisible.next(false);
    clearTimeout(this.timer);
  }

  private updateFavoritesCound() {
    const cartItems = this.getFavorites();
    this.favorites.next(cartItems.length);
  }

  initFavoritesCound() {
    return this.getFavorites().length;
  }

  /* 
  In normal app there would be a call to the backend and information about favorite products would be user's data stored in a database. Local Storage is used for live demo purposes only. 
  */

  getFavorites(): string[] {
    let favorites = [];
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      favorites = JSON.parse(favoritesString);
    }
    return favorites;
  }

  addToFavorites(id: string) {
    let favorites = this.getFavorites();
    if (favorites.find((item) => item === id)) {
      return;
    }
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.updateFavoritesCound();
    this.getAddedItem(id);
  }

  getAddedItem(id: string) {
    this.databaseService.getItem(id).then((item) => {
      this.lastAddedItem.next(item);
      this.toggleAddInfo();
    });
  }

  deleteItem(id: string) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((item) => item !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.updateFavoritesCound();
  }
}
