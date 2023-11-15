import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites = new Subject<number>();
  favorites$ = this.favorites.asObservable();

  constructor() {}

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
  }
}