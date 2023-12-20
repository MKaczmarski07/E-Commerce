import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable, map } from 'rxjs';
import { Item } from '../../models/item';
import { ActivatedRoute } from '@angular/router';
import { LoadProductService } from '../../services/load-product.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  items: Observable<Item[]> | null = null;
  showInfo = false;
  isLoaded = false;
  category = '';
  for = '';
  productType = '';
  itemsID = '';
  skeletonItems: number[] = [];
  sortType = 'default';

  constructor(
    private databaseService: DatabaseService,
    private loadProductService: LoadProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.loadData();
      this.formatProductType();
    });
    this.initSkeletonItems();
  }

  loadData() {
    this.isLoaded = false;
    this.for = this.route.snapshot.params['for'];
    this.category = this.route.snapshot.params['category'];
    this.items = this.databaseService.getCollection().pipe(
      // filter out items that are not for the current category
      map((items) =>
        items.filter(
          (item) => item.for === this.for && item.category === this.category
        )
      ),
      tap((filteredItems) => {
        this.isLoaded = true;
        this.showInfo = filteredItems.length === 0 ? true : false;
      })
    );
  }

  formatProductType() {
    this.productType =
      this.for === 'women' || this.for === 'men'
        ? this.capitalizeFirstLetter(this.for) +
          `'s` +
          ' ' +
          this.capitalizeFirstLetter(this.category)
        : this.capitalizeFirstLetter(this.for) +
          ' ' +
          this.capitalizeFirstLetter(this.category);
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  onProductClick(item: Item) {
    this.loadProductService.loadProduct(item);
  }

  initSkeletonItems() {
    this.skeletonItems = Array(8).fill(0);
  }

  sortByPrice(direction: string) {
    if (!this.items) return;
    this.isLoaded = false;
    let sortedItems;

    if (direction === 'ascending') {
      sortedItems = this.items.pipe(
        map((arr) =>
          arr.sort(
            (a, b) => this.getEffectivePrice(a) - this.getEffectivePrice(b)
          )
        ),
        tap(() => (this.isLoaded = true))
      );
    }

    if (direction === 'descending') {
      sortedItems = this.items.pipe(
        map((arr) =>
          arr.sort(
            (a, b) => this.getEffectivePrice(b) - this.getEffectivePrice(a)
          )
        ),
        tap(() => (this.isLoaded = true))
      );
    }

    if (!sortedItems) return;
    this.items = sortedItems;
  }

  getEffectivePrice(item: Item): number {
    return item.discountPrice !== undefined ? item.discountPrice : item.price;
  }

  sortByName(direction: string) {
    if (!this.items) return;
    this.isLoaded = false;
    let sortedItems;

    if (direction === 'ascending') {
      sortedItems = this.items.pipe(
        map((arr) =>
          arr.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })
        ),
        tap(() => (this.isLoaded = true))
      );
    }

    if (direction === 'descending') {
      sortedItems = this.items.pipe(
        map((arr) =>
          arr.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          })
        ),
        tap(() => (this.isLoaded = true))
      );
    }

    if (!sortedItems) return;
    this.items = sortedItems;
  }

  onSortChange() {
    if (this.sortType === 'default') {
      this.loadData();
      return;
    }

    if (this.sortType === 'lowToHigh') {
      this.sortByPrice('ascending');
      return;
    }

    if (this.sortType === 'highToLow') {
      this.sortByPrice('descending');
      return;
    }

    if (this.sortType === 'aToZ') {
      this.sortByName('ascending');
      return;
    }

    if (this.sortType === 'zToA') {
      this.sortByName('descending');
      return;
    }
  }
}
