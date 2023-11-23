import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { LoadProductService } from 'src/app/services/load-product.service';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';
import { Router } from '@angular/router';
import { map, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoes: Observable<Item[]> | undefined;
  bestSellers: Observable<Item[]> | undefined;
  itemsOnSale: Observable<Item[]> | undefined;
  skeletonItems: number[] = [];

  constructor(
    private databaseService: DatabaseService,
    private loadProductService: LoadProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initSkeletonItems();
    this.shoes = this.databaseService.getCollection();
    this.bestSellers = this.databaseService.getCollection().pipe(
      map((items) => items.filter((item) => item.isBestSeller === true))
      // takeWhile((items) => items.length > 1 && items.length < 6)
    );
    this.itemsOnSale = this.databaseService.getCollection().pipe(
      map((items) => items.filter((item) => item.discountPrice !== undefined)),
      takeWhile((items) => items.length > 1 && items.length < 6)
      // propably take(6) also works but there have to be more items
    );
  }

  onProductClick(item: Item) {
    this.loadProductService.loadProduct(item);
  }

  initSkeletonItems() {
    this.skeletonItems = Array(3).fill(0);
  }
}
