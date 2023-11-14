import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class LoadProductService {
  constructor(private router: Router) {}

  loadProduct(item: Item) {
    const path = 'products/' + item.for + '/' + item.category + '/' + item.id;
    this.router.navigate([path]);
    window.scrollTo(0, 0);
  }
}
